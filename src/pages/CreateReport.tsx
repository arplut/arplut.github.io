import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { reportsService, CreateReportData } from '@/services/reportsService';
import { Loader2, AlertTriangle, MapPin } from 'lucide-react';
import LocationPicker, { type Location } from '@/components/LocationPicker';

const reportSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters long.'),
  description: z.string().min(20, 'Description must be at least 20 characters long.'),
  category: z.enum(['garbage', 'sewage', 'burning', 'construction', 'pollution', 'other']),
  photos: z.instanceof(FileList).refine(files => files.length > 0, 'At least one photo is required.'),
  isAnonymous: z.boolean().default(false),
  // Simple validation for now, should be more robust
  address: z.string().min(5, 'Address is required.'),
  city: z.string().min(2, 'City is required.'),
  state: z.string().min(2, 'State is required.'),
});

const CreateReport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    latitude: 12.9716,
    longitude: 77.5946,
    address: ''
  });

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      isAnonymous: false,
      address: 'Bengaluru', // Default values
      city: 'Bengaluru',
      state: 'Karnataka',
    },
  });

  const onSubmit = async (values: z.infer<typeof reportSchema>) => {
    if (!user) {
      toast({ title: 'Authentication Error', description: 'You must be logged in to create a report.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const reportData: CreateReportData = {
        title: values.title,
        description: values.description,
        category: values.category,
        location: {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          address: selectedLocation.address || values.address,
          city: values.city,
          state: values.state,
        },
        photos: Array.from(values.photos),
        isAnonymous: values.isAnonymous,
        capturedAt: new Date(),
      };

      await reportsService.createReport(reportData, user.uid);

      toast({
        title: 'Report Submitted!',
        description: 'Thank you for making your community better.',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create report:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">You must be logged in to report an issue.</p>
        <Button asChild>
          <Link to="/login">Login to Continue</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl p-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Report</CardTitle>
          <CardDescription>Fill out the details below to report a civic issue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Large garbage pile on 5th Main" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Provide more details about the issue..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="garbage">Garbage</SelectItem>
                        <SelectItem value="sewage">Sewage</SelectItem>
                        <SelectItem value="burning">Burning</SelectItem>
                        <SelectItem value="construction">Construction Debris</SelectItem>
                        <SelectItem value="pollution">Pollution</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photos</FormLabel>
                    <FormControl>
                      <Input type="file" multiple {...form.register('photos')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Location Picker */}
              <div className="space-y-2">
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </FormLabel>
                <LocationPicker
                  initialLocation={selectedLocation}
                  onLocationChange={setSelectedLocation}
                  height="300px"
                />
                <p className="text-sm text-muted-foreground">
                  Click on the map to set the exact location of the issue, or use your current location.
                </p>
              </div>

               <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., 123 Main St" 
                        {...field} 
                        value={selectedLocation.address || field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setSelectedLocation(prev => ({ ...prev, address: e.target.value }));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAnonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Report Anonymously</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        If checked, your name will not be publicly associated with this report.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateReport;