import { Construction } from "lucide-react";

const WorkInProgressOverlay = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-gradient-primary/10 flex items-center justify-center">
            <Construction className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Work in Progress</h2>
          <p className="text-muted-foreground">
            We're working hard to bring you this feature. In the meantime, explore our homepage and about page!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkInProgressOverlay;
