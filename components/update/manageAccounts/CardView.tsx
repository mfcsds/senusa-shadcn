import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/update/ui/card";
import { Progress } from "@/components/update/progress/Progress";
import Button from "@/components/update/button/Button";
import { HospitalIcon } from "lucide-react";


interface CardViewProps {
  data: Array<{
    name: string;
    id: string;
    usedStorage: number;
    totalStorage: number;
  }>;
}

const CardView: React.FC<CardViewProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center mb-4">
              <HospitalIcon className="w-10 h-10 text-primary" />
              <div className="ml-4">
                <CardTitle className="text-lg font-semibold text-text-primary">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-text-secondary text-sm">
                  {item.id}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <h2 className="text-sm text-text-primary font-nostalgic">Subscription Type</h2>
              <p className="text-text-secondary text-sm font-semibold">1 Months</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-sm text-text-primary font-nostalgic">Storage Quota</p>
              <p className="text-text-secondary text-sm font-semibold">
                {item.usedStorage} / {item.totalStorage}GB
              </p>
            </div>
            <Progress value={40} className="w-full" />
          </CardContent>
          <CardFooter className="flex justify-end mt-2 mb-2 gap-2">
            <Button label="View" variant="outlineSecondary" size="medium" />
            <Button label="Delete" variant="outlineDanger" className="h-8" />
          </CardFooter>
        </Card>
      ))}
    </div>
    
    

  );
};

export default CardView;
