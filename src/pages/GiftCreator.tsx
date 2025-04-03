// Add this import at the top of your file
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import useTranslate from "@/hooks/useTranslate";

// Inside your component's return statement, add this somewhere (perhaps at the top)
const GiftCreator = () => {
  const t = useTranslate();
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("Create a Gift")}</h1>
        <Link to="/profile-settings">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("Profile Settings")}
          </Button>
        </Link>
      </div>
      
      {/* Rest of your GiftCreator component */}
    </div>
  );
};

export default GiftCreator;
