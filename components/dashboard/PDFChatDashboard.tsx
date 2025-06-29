'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MessageSquare, 
  Upload, 
  FileText, 
  Send,
  Bot,
  User,
  Paperclip,
  Download,
  Trash2
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function PDFChatDashboard() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'ve analyzed your PDF. What would you like to know about it?',
      timestamp: new Date()
    }
  ])
  
  const [uploadedPDFs] = useState([
    {
      id: 1,
      name: 'Computer Science Textbook.pdf',
      size: '15.2 MB',
      pages: 450,
      uploadDate: '2 hours ago',
      status: 'processed'
    },
    {
      id: 2,
      name: 'Research Paper - AI.pdf',
      size: '3.8 MB',
      pages: 25,
      uploadDate: '1 day ago',
      status: 'processed'
    },
    {
      id: 3,
      name: 'Study Guide.pdf',
      size: '2.1 MB',
      pages: 12,
      uploadDate: '3 days ago',
      status: 'processed'
    }
  ])

  const { toast } = useToast()

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Based on the PDF content, here\'s what I found: The document discusses key concepts related to your question. Would you like me to elaborate on any specific section?',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleFileUpload = () => {
    toast({
      title: 'PDF Upload',
      description: 'PDF upload functionality will be implemented here.'
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-mono font-bold flex items-center gap-2">
          <MessageSquare className="h-8 w-8" />
          PDF Chat
        </h1>
        <p className="text-muted-foreground">
          Upload PDFs and chat with them using AI to extract insights and answers
        </p>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Chat Interface</TabsTrigger>
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value="upload">Upload PDF</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Document Sidebar */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Active Document</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Computer Science Textbook.pdf</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>450 pages • 15.2 MB</p>
                    <Badge variant="secondary" className="text-xs">Active</Badge>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" size="sm">
                  Switch Document
                </Button>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat with PDF
                </CardTitle>
                <CardDescription>
                  Ask questions about your document and get AI-powered answers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Messages */}
                <ScrollArea className="h-[400px] border rounded-lg p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${
                          msg.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`flex gap-2 max-w-[80%] ${
                            msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {msg.type === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </div>
                          <div
                            className={`rounded-lg p-3 ${
                              msg.type === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question about your PDF..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My PDF Documents</CardTitle>
              <CardDescription>
                Manage your uploaded PDF documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedPDFs.map((pdf) => (
                  <div key={pdf.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{pdf.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{pdf.pages} pages</span>
                          <span>•</span>
                          <span>{pdf.size}</span>
                          <span>•</span>
                          <span>{pdf.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{pdf.status}</Badge>
                      <Button variant="outline" size="sm">
                        Chat
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload PDF Document</CardTitle>
              <CardDescription>
                Upload a PDF to start chatting with it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Upload PDF Document</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your PDF here, or click to browse
                </p>
                <Button onClick={handleFileUpload}>
                  <Paperclip className="mr-2 h-4 w-4" />
                  Choose PDF File
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Upload Guidelines:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Maximum file size: 50MB</li>
                  <li>• Supported format: PDF only</li>
                  <li>• Text-based PDFs work best (not scanned images)</li>
                  <li>• Processing time: 1-3 minutes depending on size</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}