from datetime import datetime, timedelta
from typing import Optional, Dict, List
from enum import Enum
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Security configuration
SECRET_KEY = "your-secret-key-here-change-in-production"  # Change this in production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# Role enumeration
class UserRole(str, Enum):
    ADMIN = "admin"
    GRANT_WRITER = "grant_writer"
    REVIEWER = "reviewer"

# Pydantic models
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

class TokenData(BaseModel):
    email: str
    role: Optional[UserRole] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# In-memory user store (replace with database in production)
USERS_DB: Dict[str, UserInDB] = {
    "admin@akios.gov": UserInDB(
        id="admin-001",
        email="admin@akios.gov",
        full_name="Administrator User",
        role=UserRole.ADMIN,
        is_active=True,
        hashed_password=pwd_context.hash("admin123")
    ),
    "writer@akios.gov": UserInDB(
        id="writer-001",
        email="writer@akios.gov",
        full_name="Grant Writer User",
        role=UserRole.GRANT_WRITER,
        is_active=True,
        hashed_password=pwd_context.hash("writer123")
    ),
    "reviewer@akios.gov": UserInDB(
        id="reviewer-001",
        email="reviewer@akios.gov",
        full_name="Reviewer User",
        role=UserRole.REVIEWER,
        is_active=True,
        hashed_password=pwd_context.hash("reviewer123")
    )
}

# Authentication functions
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)

def get_user(email: str) -> Optional[UserInDB]:
    """Get user from database by email."""
    if email in USERS_DB:
        return USERS_DB[email]
    return None

def authenticate_user(email: str, password: str) -> Optional[UserInDB]:
    """Authenticate user with email and password."""
    user = get_user(email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    if not user.is_active:
        return None
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
    """Get current user from JWT token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    user = get_user(email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)) -> UserInDB:
    """Get current active user."""
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# Role-based access control dependencies
def require_role(required_role: UserRole):
    """Dependency to require a specific role."""
    def role_checker(current_user: UserInDB = Depends(get_current_active_user)) -> UserInDB:
        if current_user.role != required_role and current_user.role != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role: {required_role}"
            )
        return current_user
    return role_checker

def require_any_role(required_roles: List[UserRole]):
    """Dependency to require any of the specified roles."""
    def role_checker(current_user: UserInDB = Depends(get_current_active_user)) -> UserInDB:
        if current_user.role not in required_roles and current_user.role != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required roles: {', '.join(required_roles)}"
            )
        return current_user
    return role_checker

# Convenience role dependencies
require_admin = require_role(UserRole.ADMIN)
require_grant_writer = require_role(UserRole.GRANT_WRITER)
require_reviewer = require_role(UserRole.REVIEWER)
require_grant_writer_or_reviewer = require_any_role([UserRole.GRANT_WRITER, UserRole.REVIEWER])

# Authentication endpoints
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> Token:
    """Login endpoint that returns JWT token."""
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role.value},
        expires_delta=access_token_expires
    )
    
    logger.info(f"User {user.email} logged in successfully")
    return Token(
        access_token=access_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

async def get_current_user_info(current_user: UserInDB = Depends(get_current_active_user)) -> User:
    """Get current user information."""
    return User(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        role=current_user.role,
        is_active=current_user.is_active
    )

async def get_users() -> List[User]:
    """Get all users (admin only)."""
    return [
        User(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
            is_active=user.is_active
        )
        for user in USERS_DB.values()
    ]

# Utility functions
def get_user_by_id(user_id: str) -> Optional[UserInDB]:
    """Get user by ID."""
    for user in USERS_DB.values():
        if user.id == user_id:
            return user
    return None

def create_user(user_data: UserCreate) -> UserInDB:
    """Create a new user."""
    if user_data.email in USERS_DB:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    user_id = f"{user_data.role.value}-{len(USERS_DB) + 1:03d}"
    hashed_password = get_password_hash(user_data.password)
    
    user = UserInDB(
        id=user_id,
        email=user_data.email,
        full_name=user_data.full_name,
        role=user_data.role,
        is_active=user_data.is_active,
        hashed_password=hashed_password
    )
    
    USERS_DB[user_data.email] = user
    logger.info(f"Created new user: {user_data.email} with role: {user_data.role}")
    return user 