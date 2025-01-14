import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/update/ui/card";
import { Progress } from "@/components/update/progress/Progress";
import Button from "@/components/update/button/Button";
import { HospitalIcon } from "lucide-react";
import { Institution } from "@/utils/object";
import { useRouter } from "next/navigation";

interface CardViewProps {
  intialInstitution: Institution[];
}

const CardView: React.FC<CardViewProps> = ({ intialInstitution }) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {intialInstitution.map((institution) => (
        <Card key={institution.id}>
          <CardHeader>
            <div className="flex items-center mb-4">
              <HospitalIcon className="w-10 h-10 text-primary" />
              <div className="ml-4">
                <CardTitle className="text-lg font-semibold text-text-primary">
                  {institution.name}
                </CardTitle>
                <CardDescription className="text-text-secondary text-sm">
                  {institution.id}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <h2 className="text-sm text-text-primary font-nostalgic">
                Subscription Type
              </h2>
              <p className="text-text-secondary text-sm font-semibold">
                {institution.subscription_type} Months
              </p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-sm text-text-primary font-nostalgic">
                Storage Quota
              </p>
              <p className="text-text-secondary text-sm font-semibold">
                {institution.currentStorageQuota} / {institution.storageQuota} GB
              </p>
            </div>
            <Progress
              value={
                (institution.currentStorageQuota / institution.currentStorageQuota) * 100
              }
              className="w-full"
            />
          </CardContent>
          <CardFooter className="flex justify-end mt-2 mb-2 gap-4">
            <Button
              label="View"
              variant="outlineSecondary"
              size="medium"
              onClick={() =>
                router.push(`/features/manage-accounts/${institution.id}`)
              }
            />
            <Button label="Delete" variant="outlineDanger" className="h-8" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardView;
