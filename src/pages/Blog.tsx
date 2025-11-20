import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-gradient-subtle py-12 border-b border-border/50">
        <div className="container px-4 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Knowledge Hub</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Insights, updates, and resources on civic engagement and urban development.
          </p>
        </div>
      </div>

      <div className="flex-1 container px-4 py-8 max-w-7xl mx-auto w-full">
        <Card className="shadow-lg border-border/50 overflow-hidden h-[800px] w-full">
          <CardContent className="p-0 h-full w-full">
            <iframe
              src="https://glen-hammer-7bb.notion.site/ebd/1abc5691405e80baa346dcda909b50f0"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Arplut Knowledge Hub - Blog"
              className="w-full h-full"
              style={{
                border: 'none',
                outline: 'none',
                display: 'block',
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
