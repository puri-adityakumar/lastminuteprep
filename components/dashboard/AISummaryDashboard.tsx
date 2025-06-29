'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Sparkles, 
  FileText, 
  Clock, 
  Download,
  Upload,
  Link as LinkIcon,
  Loader2,
  Copy,
  Star
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function AISummaryDashboard() {
  const [loading, setLoading] = useState(false)
  const [inputText, setInputText] = useState('')
  const [url, setUrl] = useState('')
  const [summary, setSummary] = useState('')
  const { toast } = useToast()

  const [recentSummaries] = useState([
    {
      id: 1,
      title: 'React Hooks Documentation',
      type: 'URL',
      date: '2 hours ago',
      length: 'Medium',
      rating: 5
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      type: 'Text',
      date: '1 day ago',
      length: 'Long',
      rating: 4
    },
    {
      id: 3,
      title: 'JavaScript ES6 Features',
      type: 'File',
      date: '2 days ago',
      length: 'Short',
      rating: 5
    }
  ])

  const handleGenerateSummary = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some text to summarize',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSummary(`Here's a concise summary of your text:\n\nThe provided content discusses key concepts and methodologies. Main points include:\n\n• Core principles and fundamentals\n• Practical applications and use cases\n• Best practices and recommendations\n• Future considerations and trends\n\nThis summary captures the essential information while maintaining clarity and focus.`)
      
      toast({
        title: 'Summary Generated!',
        description: 'Your AI summary has been created successfully.'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate summary. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary)
    toast({
      title: 'Copied!',
      description: 'Summary copied to clipboard.'
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-mono font-bold flex items-center gap-2">
          <Sparkles className="h-8 w-8" />
          AI Summary
        </h1>
        <p className="text-muted-foreground">
          Generate intelligent summaries from text, URLs, and documents using AI
        </p>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Summary</TabsTrigger>
          <TabsTrigger value="history">Summary History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Input Content</CardTitle>
                <CardDescription>
                  Enter text, paste a URL, or upload a document to summarize
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="file">File</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="space-y-4">
                    <Textarea
                      placeholder="Paste your text here to generate a summary..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </TabsContent>
                  
                  <TabsContent value="url" className="space-y-4">
                    <Input
                      placeholder="https://example.com/article"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter a URL to extract and summarize its content
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="file" className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop a file here, or click to browse
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button 
                  onClick={handleGenerateSummary} 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Summary...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card>
              <CardHeader>
                <CardTitle>AI Summary</CardTitle>
                <CardDescription>
                  Your generated summary will appear here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {summary ? (
                  <>
                    <div className="bg-muted/50 rounded-lg p-4 min-h-[200px]">
                      <pre className="whitespace-pre-wrap text-sm">{summary}</pre>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopySummary}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="bg-muted/25 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center">
                    <div className="space-y-2">
                      <Sparkles className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Your AI-generated summary will appear here
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary History</CardTitle>
              <CardDescription>
                Your previously generated summaries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSummaries.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <span>•</span>
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary Settings</CardTitle>
              <CardDescription>
                Customize how your summaries are generated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Summary Length</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Short (1-2 paragraphs)</option>
                  <option>Medium (3-4 paragraphs)</option>
                  <option>Long (5+ paragraphs)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Summary Style</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Bullet Points</option>
                  <option>Paragraph Form</option>
                  <option>Key Takeaways</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Focus Area</label>
                <select className="w-full p-2 border rounded-md">
                  <option>General Summary</option>
                  <option>Key Concepts</option>
                  <option>Action Items</option>
                  <option>Technical Details</option>
                </select>
              </div>

              <Button className="w-full">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}