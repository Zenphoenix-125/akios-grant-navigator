import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GrantManagerSidebar } from "@/components/GrantManagerSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Settings, Upload, Download, Eye, Trash2, FileText, File, Image, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockDocuments = [
  {
    id: "doc-001",
    name: "Tribal Health Services Narrative.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "July 12, 2024",
    grantTitle: "Tribal Health Services Expansion Grant",
    category: "Narrative",
    status: "Final"
  },
  {
    id: "doc-002",
    name: "Budget_Breakdown_2024.xlsx",
    type: "excel",
    size: "1.1 MB",
    uploadDate: "July 10, 2024",
    grantTitle: "Tribal Health Services Expansion Grant",
    category: "Budget",
    status: "Draft"
  },
  {
    id: "doc-003",
    name: "Organizational_Chart.png",
    type: "image",
    size: "485 KB",
    uploadDate: "June 28, 2024",
    grantTitle: "Native Language Preservation Initiative",
    category: "Supporting Documents",
    status: "Final"
  },
  {
    id: "doc-004",
    name: "Letters_of_Support.zip",
    type: "archive",
    size: "3.2 MB",
    uploadDate: "June 25, 2024",
    grantTitle: "Educational Technology Enhancement Grant",
    category: "Letters",
    status: "Final"
  },
  {
    id: "doc-005",
    name: "Environmental_Impact_Report.pdf",
    type: "pdf",
    size: "5.7 MB",
    uploadDate: "August 2, 2024",
    grantTitle: "EPA Environmental Justice Grant",
    category: "Reports",
    status: "Under Review"
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-red-400" />;
    case "excel":
      return <File className="w-5 h-5 text-green-400" />;
    case "image":
      return <Image className="w-5 h-5 text-blue-400" />;
    case "archive":
      return <Archive className="w-5 h-5 text-purple-400" />;
    default:
      return <File className="w-5 h-5 text-muted-foreground" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Final":
      return "bg-green-500/15 text-green-400 border-green-500/25";
    case "Draft":
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/25";
    case "Under Review":
      return "bg-blue-500/15 text-blue-400 border-blue-500/25";
    default:
      return "bg-muted/15 text-muted-foreground border-muted/25";
  }
};

const DocumentVault = () => {
  const documentsByCategory = {
    all: mockDocuments,
    narratives: mockDocuments.filter(doc => doc.category === "Narrative"),
    budgets: mockDocuments.filter(doc => doc.category === "Budget"),
    supporting: mockDocuments.filter(doc => doc.category === "Supporting Documents" || doc.category === "Letters" || doc.category === "Reports")
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        <GrantManagerSidebar />
        
        <div className="flex-1 flex">
          <main className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Header */}
              <header className="border-b border-border/20 bg-background backdrop-blur-sm sticky top-0 z-40">
                <div className="akios-layout">
                  <div className="flex items-center justify-between py-6">
                    <div className="flex items-center space-x-4">
                      <SidebarTrigger className="lg:hidden" />
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">
                          Document Vault
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                          Secure cloud storage for all your grant documents
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button size="sm" className="akios-button-primary">
                        <Upload className="system-icon mr-2" />
                        Upload Files
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                        <Bell className="system-icon" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                        <Settings className="system-icon" />
                      </Button>
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <div className="flex-1 overflow-auto">
                <div className="akios-layout py-8">
                  <div className="akios-spacing-lg">
                    {/* Storage Stats */}
                    <section className="akios-section">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card className="akios-card">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Files</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-foreground">127</div>
                            <p className="text-xs text-muted-foreground">Across all grants</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="akios-card">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Storage Used</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-blue-400">2.8 GB</div>
                            <p className="text-xs text-muted-foreground">of 50 GB available</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="akios-card">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Recent Uploads</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-400">12</div>
                            <p className="text-xs text-muted-foreground">This week</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="akios-card">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Shared Files</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-purple-400">34</div>
                            <p className="text-xs text-muted-foreground">With team members</p>
                          </CardContent>
                        </Card>
                      </div>
                    </section>

                    {/* Document Categories */}
                    <section className="akios-section">
                      <Tabs defaultValue="all" className="w-full">
                        <div className="flex justify-center mb-8">
                          <TabsList className="akios-tabs-list">
                            <TabsTrigger value="all" className="akios-tab-trigger">
                              All Files
                            </TabsTrigger>
                            <TabsTrigger value="narratives" className="akios-tab-trigger">
                              Narratives
                            </TabsTrigger>
                            <TabsTrigger value="budgets" className="akios-tab-trigger">
                              Budgets
                            </TabsTrigger>
                            <TabsTrigger value="supporting" className="akios-tab-trigger">
                              Supporting Docs
                            </TabsTrigger>
                          </TabsList>
                        </div>

                        {Object.entries(documentsByCategory).map(([category, documents]) => (
                          <TabsContent key={category} value={category}>
                            <div className="space-y-4">
                              {documents.map((document) => (
                                <Card key={document.id} className="akios-card group cursor-pointer hover:border-primary/30 transition-all">
                                  <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                                        <div className="flex-shrink-0">
                                          {getFileIcon(document.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h3 className="text-base font-semibold text-foreground group-hover:text-primary/90 transition-colors truncate">
                                            {document.name}
                                          </h3>
                                          <p className="text-sm text-muted-foreground truncate">
                                            {document.grantTitle}
                                          </p>
                                          <div className="flex items-center space-x-4 mt-2">
                                            <span className="text-xs text-muted-foreground">{document.size}</span>
                                            <span className="text-xs text-muted-foreground">{document.uploadDate}</span>
                                            <Badge className={`category-pill ${getStatusColor(document.status)} text-xs`}>
                                              {document.status}
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center space-x-2 ml-4">
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                          <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                          <Download className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-400">
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DocumentVault;
