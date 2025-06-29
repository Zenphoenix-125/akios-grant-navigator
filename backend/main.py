from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum
from typing import Optional, List
from datetime import datetime, timedelta
import logging
import re

# Import authentication module
from auth import (
    login, get_current_user_info, get_users, create_user,
    require_admin, require_grant_writer, require_reviewer, require_grant_writer_or_reviewer,
    User, UserCreate, UserRole
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AKIOS Grant Navigator API",
    description="Sovereign-first AI system for tribal government infrastructure grant discovery",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GrantCategory(str, Enum):
    HEALTH = "Health"
    EDUCATION = "Education"
    INFRASTRUCTURE = "Infrastructure"
    CULTURAL = "Cultural"
    ENVIRONMENT = "Environment"
    ECONOMIC = "Economic Development"
    TECHNOLOGY = "Technology"
    PUBLIC_SAFETY = "Public Safety"

class Grant(BaseModel):
    id: str
    title: str
    agency: str
    amount: str
    deadline: str
    match_score: int
    category: GrantCategory
    match_required: bool
    days_left: int
    description: Optional[str] = None
    eligibility: Optional[str] = None
    url: Optional[str] = None

class GrantFilters(BaseModel):
    search: Optional[str] = None
    category: Optional[str] = None
    min_amount: Optional[str] = None
    max_amount: Optional[str] = None
    min_match_score: Optional[int] = None
    max_days_left: Optional[int] = None
    match_required: Optional[bool] = None

# Tribal sovereignty keywords for match scoring
TRIBAL_KEYWORDS = {
    "tribal": 15, "tribe": 15, "native": 12, "indian": 12,
    "indigenous": 10, "sovereignty": 8, "cultural": 6,
    "traditional": 6, "reservation": 8, "community": 4,
    "federally recognized": 10, "tribal government": 12,
    "native american": 10, "alaska native": 10, "hawaiian": 8,
    "first nations": 8, "aboriginal": 6, "heritage": 4,
    "ancestral": 4, "ceremonial": 4, "language preservation": 6,
    "cultural preservation": 6, "tribal lands": 8, "reservation": 8
}

def calculate_match_score(title: str, description: str = "") -> int:
    """Calculate tribal relevance match score based on keywords"""
    text = (title + " " + description).lower()
    score = 0
    
    for keyword, points in TRIBAL_KEYWORDS.items():
        if keyword in text:
            score += points
    
    # Cap at 100
    return min(score, 100)

def parse_amount(amount_str: str) -> int:
    """Parse amount string to numeric value for filtering"""
    return int(re.sub(r'[^\d]', '', amount_str))

# Mock grant data with 12 realistic tribal grants
GRANTS_DATA = [
    {
        "id": "hrsa-2024-001",
        "title": "Tribal Health Service Delivery Enhancement Grant",
        "agency": "Health Resources and Services Administration (HRSA)",
        "amount": "$750,000",
        "deadline": "2024-09-15",
        "category": GrantCategory.HEALTH,
        "match_required": True,
        "description": "Funding to improve healthcare delivery in tribal communities through enhanced infrastructure, telemedicine capabilities, and culturally appropriate service coordination.",
        "eligibility": "Federally recognized tribes, tribal organizations, urban Indian health organizations",
        "url": "https://www.hrsa.gov/grants/tribal-health"
    },
    {
        "id": "nea-2024-002",
        "title": "Native Arts and Cultural Preservation Initiative",
        "agency": "National Endowment for the Arts (NEA)",
        "amount": "$125,000",
        "deadline": "2024-10-01",
        "category": GrantCategory.CULTURAL,
        "match_required": False,
        "description": "Support for tribal arts organizations to preserve and promote traditional cultural practices, language revitalization, and artistic expression.",
        "eligibility": "Federally recognized tribes, tribal arts organizations, native cultural institutions",
        "url": "https://www.arts.gov/grants/tribal-arts"
    },
    {
        "id": "dot-2024-003",
        "title": "Tribal Transportation Infrastructure Development",
        "agency": "Department of Transportation (DOT)",
        "amount": "$2,500,000",
        "deadline": "2024-11-30",
        "category": GrantCategory.INFRASTRUCTURE,
        "match_required": True,
        "description": "Funding for transportation infrastructure projects on tribal lands including roads, bridges, and public transit systems.",
        "eligibility": "Federally recognized tribes, tribal transportation departments",
        "url": "https://www.transportation.gov/tribal-transportation"
    },
    {
        "id": "epa-2024-004",
        "title": "Environmental Justice for Tribal Communities",
        "agency": "Environmental Protection Agency (EPA)",
        "amount": "$300,000",
        "deadline": "2024-08-20",
        "category": GrantCategory.ENVIRONMENT,
        "match_required": False,
        "description": "Addressing environmental justice issues in tribal communities through pollution monitoring, cleanup efforts, and environmental health programs.",
        "eligibility": "Federally recognized tribes, tribal environmental departments",
        "url": "https://www.epa.gov/environmentaljustice/tribal-grants"
    },
    {
        "id": "usda-2024-005",
        "title": "Tribal Food Sovereignty and Agriculture Development",
        "agency": "U.S. Department of Agriculture (USDA)",
        "amount": "$500,000",
        "deadline": "2024-09-30",
        "category": GrantCategory.ECONOMIC,
        "match_required": True,
        "description": "Supporting tribal food sovereignty initiatives, traditional agriculture practices, and sustainable farming on tribal lands.",
        "eligibility": "Federally recognized tribes, tribal agricultural programs",
        "url": "https://www.usda.gov/tribal-relations"
    },
    {
        "id": "ed-2024-006",
        "title": "Native Language Immersion and Education Program",
        "agency": "Department of Education",
        "amount": "$450,000",
        "deadline": "2024-07-20",
        "category": GrantCategory.EDUCATION,
        "match_required": False,
        "description": "Funding for native language immersion programs, cultural education initiatives, and tribal school enhancement projects.",
        "eligibility": "Federally recognized tribes, tribal schools, native education organizations",
        "url": "https://www.ed.gov/tribal-education"
    },
    {
        "id": "hud-2024-007",
        "title": "Tribal Housing and Community Development",
        "agency": "Department of Housing and Urban Development (HUD)",
        "amount": "$1,200,000",
        "deadline": "2024-10-15",
        "category": GrantCategory.INFRASTRUCTURE,
        "match_required": True,
        "description": "Supporting tribal housing development, community facilities, and infrastructure improvements on tribal lands.",
        "eligibility": "Federally recognized tribes, tribal housing authorities",
        "url": "https://www.hud.gov/tribal-housing"
    },
    {
        "id": "doj-2024-008",
        "title": "Tribal Public Safety and Justice Enhancement",
        "agency": "Department of Justice (DOJ)",
        "amount": "$800,000",
        "deadline": "2024-08-10",
        "category": GrantCategory.PUBLIC_SAFETY,
        "match_required": False,
        "description": "Enhancing tribal law enforcement capabilities, justice systems, and public safety infrastructure in tribal communities.",
        "eligibility": "Federally recognized tribes, tribal law enforcement agencies",
        "url": "https://www.justice.gov/tribal"
    },
    {
        "id": "nsf-2024-009",
        "title": "Tribal STEM Education and Technology Initiative",
        "agency": "National Science Foundation (NSF)",
        "amount": "$600,000",
        "deadline": "2024-09-01",
        "category": GrantCategory.TECHNOLOGY,
        "match_required": True,
        "description": "Advancing STEM education in tribal communities through technology integration, digital literacy, and innovation programs.",
        "eligibility": "Federally recognized tribes, tribal educational institutions",
        "url": "https://www.nsf.gov/tribal-stem"
    },
    {
        "id": "ihs-2024-010",
        "title": "Indian Health Service Behavioral Health Enhancement",
        "agency": "Indian Health Service (IHS)",
        "amount": "$400,000",
        "deadline": "2024-07-15",
        "category": GrantCategory.HEALTH,
        "match_required": False,
        "description": "Expanding behavioral health services in tribal communities with culturally appropriate mental health and substance abuse programs.",
        "eligibility": "Federally recognized tribes, tribal health organizations",
        "url": "https://www.ihs.gov/behavioral-health"
    },
    {
        "id": "nps-2024-011",
        "title": "Tribal Cultural Heritage and Land Conservation",
        "agency": "National Park Service (NPS)",
        "amount": "$350,000",
        "deadline": "2024-08-25",
        "category": GrantCategory.CULTURAL,
        "match_required": True,
        "description": "Preserving tribal cultural heritage sites, traditional ecological knowledge, and land conservation efforts on tribal territories.",
        "eligibility": "Federally recognized tribes, tribal cultural preservation organizations",
        "url": "https://www.nps.gov/tribal-heritage"
    },
    {
        "id": "doc-2024-012",
        "title": "Tribal Economic Development and Entrepreneurship",
        "agency": "Department of Commerce",
        "amount": "$900,000",
        "deadline": "2024-09-30",
        "category": GrantCategory.ECONOMIC,
        "match_required": True,
        "description": "Supporting tribal economic development through entrepreneurship programs, business development, and workforce training initiatives.",
        "eligibility": "Federally recognized tribes, tribal economic development organizations",
        "url": "https://www.commerce.gov/tribal-economic-development"
    }
]

# Calculate match scores and days left for all grants
def process_grants_data():
    processed_grants = []
    today = datetime.now()
    
    for grant_data in GRANTS_DATA:
        deadline_date = datetime.strptime(grant_data["deadline"], "%Y-%m-%d")
        days_left = (deadline_date - today).days
        
        # Calculate match score
        match_score = calculate_match_score(grant_data["title"], grant_data.get("description", ""))
        
        processed_grant = Grant(
            **grant_data,
            match_score=match_score,
            days_left=max(0, days_left)
        )
        processed_grants.append(processed_grant)
    
    return processed_grants

# Initialize grants data
grants = process_grants_data()

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "AKIOS Grant Navigator API", "timestamp": datetime.now().isoformat()}

@app.get("/api/grants/discover", response_model=List[Grant])
async def discover_grants(
    search: Optional[str] = Query(None, description="Search term for grant title, agency, or description"),
    category: Optional[str] = Query(None, description="Filter by grant category"),
    min_amount: Optional[str] = Query(None, description="Minimum grant amount"),
    max_amount: Optional[str] = Query(None, description="Maximum grant amount"),
    min_match_score: Optional[int] = Query(None, ge=0, le=100, description="Minimum match score"),
    max_days_left: Optional[int] = Query(None, ge=0, description="Maximum days until deadline"),
    match_required: Optional[bool] = Query(None, description="Filter by match requirement")
):
    """Discover grants with advanced filtering"""
    logger.info(f"Grant discovery request: search={search}, category={category}, min_score={min_match_score}")
    
    filtered_grants = grants.copy()
    
    # Apply search filter
    if search:
        search_lower = search.lower()
        filtered_grants = [
            grant for grant in filtered_grants
            if (search_lower in grant.title.lower() or
                search_lower in grant.agency.lower() or
                (grant.description and search_lower in grant.description.lower()))
        ]
    
    # Apply category filter
    if category and category != "all":
        filtered_grants = [
            grant for grant in filtered_grants
            if grant.category.value.lower() == category.lower()
        ]
    
    # Apply amount filters
    if min_amount:
        min_amount_val = parse_amount(min_amount)
        filtered_grants = [
            grant for grant in filtered_grants
            if parse_amount(grant.amount) >= min_amount_val
        ]
    
    if max_amount:
        max_amount_val = parse_amount(max_amount)
        filtered_grants = [
            grant for grant in filtered_grants
            if parse_amount(grant.amount) <= max_amount_val
        ]
    
    # Apply match score filter
    if min_match_score is not None:
        filtered_grants = [
            grant for grant in filtered_grants
            if grant.match_score >= min_match_score
        ]
    
    # Apply days left filter
    if max_days_left is not None:
        filtered_grants = [
            grant for grant in filtered_grants
            if grant.days_left <= max_days_left
        ]
    
    # Apply match required filter
    if match_required is not None:
        filtered_grants = [
            grant for grant in filtered_grants
            if grant.match_required == match_required
        ]
    
    # Sort by match score (highest first), then by days left (lowest first)
    filtered_grants.sort(key=lambda x: (-x.match_score, x.days_left))
    
    logger.info(f"Returning {len(filtered_grants)} grants")
    return filtered_grants

@app.get("/api/grants/{grant_id}", response_model=Grant)
async def get_grant(grant_id: str):
    """Get individual grant details"""
    logger.info(f"Grant details request for ID: {grant_id}")
    
    for grant in grants:
        if grant.id == grant_id:
            return grant
    
    raise HTTPException(status_code=404, detail="Grant not found")

@app.get("/api/grants/categories")
async def get_categories():
    """Get available grant categories"""
    categories = [category.value for category in GrantCategory]
    return {"categories": categories}

@app.get("/api/grants/stats")
async def get_grant_stats():
    """Get statistical overview of grants"""
    total_grants = len(grants)
    total_value = sum(parse_amount(grant.amount) for grant in grants)
    avg_match_score = sum(grant.match_score for grant in grants) / total_grants if total_grants > 0 else 0
    
    # Category breakdown
    category_stats = {}
    for category in GrantCategory:
        category_grants = [g for g in grants if g.category == category]
        category_stats[category.value] = {
            "count": len(category_grants),
            "total_value": sum(parse_amount(g.amount) for g in category_grants),
            "avg_match_score": sum(g.match_score for g in category_grants) / len(category_grants) if category_grants else 0
        }
    
    # Urgency breakdown
    urgent_grants = len([g for g in grants if g.days_left <= 30])
    high_priority_grants = len([g for g in grants if g.match_score >= 90])
    
    return {
        "total_grants": total_grants,
        "total_value": f"${total_value:,}",
        "average_match_score": round(avg_match_score, 1),
        "urgent_grants": urgent_grants,
        "high_priority_grants": high_priority_grants,
        "category_breakdown": category_stats
    }

# Authentication routes
@app.post("/api/auth/login")
async def auth_login(form_data=Depends(login)):
    """Login endpoint that returns JWT token"""
    return form_data

@app.get("/api/auth/me", response_model=User)
async def get_current_user(current_user: User = Depends(get_current_user_info)):
    """Get current user information"""
    return current_user

@app.get("/api/auth/users", response_model=List[User])
async def get_all_users(current_user: User = Depends(require_admin)):
    """Get all users (admin only)"""
    return await get_users()

@app.post("/api/auth/users", response_model=User)
async def create_new_user(user_data: UserCreate, current_user: User = Depends(require_admin)):
    """Create a new user (admin only)"""
    new_user = create_user(user_data)
    return User(
        id=new_user.id,
        email=new_user.email,
        full_name=new_user.full_name,
        role=new_user.role,
        is_active=new_user.is_active
    )

# Protected routes with role-based access control
@app.get("/api/auth/protected")
async def protected_route(current_user: User = Depends(get_current_user_info)):
    """Protected route that requires authentication"""
    return {
        "message": "This is a protected route",
        "user": current_user,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/auth/admin-only")
async def admin_only_route(current_user: User = Depends(require_admin)):
    """Route that requires admin role"""
    return {
        "message": "This route is admin-only",
        "user": current_user,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/auth/grant-writer-only")
async def grant_writer_only_route(current_user: User = Depends(require_grant_writer)):
    """Route that requires grant_writer role"""
    return {
        "message": "This route is grant writer only",
        "user": current_user,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/auth/reviewer-only")
async def reviewer_only_route(current_user: User = Depends(require_reviewer)):
    """Route that requires reviewer role"""
    return {
        "message": "This route is reviewer only",
        "user": current_user,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/auth/writer-or-reviewer")
async def writer_or_reviewer_route(current_user: User = Depends(require_grant_writer_or_reviewer)):
    """Route that requires either grant_writer or reviewer role"""
    return {
        "message": "This route requires grant writer or reviewer role",
        "user": current_user,
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 

    