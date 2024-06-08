import { Topbar } from '../components/Topbar';
import { Sidebar } from '../components/Sidebar';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";


const Dashboard = () => {




  return (
    <div>
      <Topbar />
      <div className='flex'>
        <Sidebar />
        <div className="flex flex-col items-center w-full p-5">
          <Card color="white" shadow={true} className="w-full h-auto p-5">

            <Typography variant="h4" color="blue-gray" className="mb-4">
              Enter URL
            </Typography>
            <form className="w-full">
              <div className="mb-6">
                <Input
                  size="lg"
                  placeholder="https://example.com"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                Submit
              </Button>
            </form>



          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
