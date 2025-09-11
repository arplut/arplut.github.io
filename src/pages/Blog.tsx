import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="w-full max-w-none mx-auto h-full">
        <Card className="shadow-soft overflow-hidden h-full">
          <CardContent className="p-0 h-full">
            <iframe 
              src="https://glen-hammer-7bb.notion.site/ebd/1abc5691405e80baa346dcda909b50f0" 
              width="100%" 
              height="800"
              frameBorder="0" 
              allowFullScreen
              title="Arplut Knowledge Hub - Blog"
              className="w-full rounded-lg"
              style={{
                border: 'none',
                outline: 'none',
                display: 'block',
                minHeight: '800px'
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
