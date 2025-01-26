import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/contexts/ProductContext";
import { Search, Send } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
// Mock emails data
const mockEmails = [
  {
    id: 1,
    from: "supplier@example.com",
    subject: "Re: Low stock alert - iPhone 14",
    message: "We can deliver the new stock by next week...",
    date: "2024-03-20",
    read: false,
    category: "stock",
  },
  {
    id: 2,
    from: "warehouse@example.com",
    subject: "Inventory Update Required",
    message: "Please update the inventory for...",
    date: "2024-03-19",
    read: true,
    category: "inventory",
  },
  {
    id: 3,
    from: "supplier@example.com",
    subject: "Re: Low stock alert - iPhone 14",
    message: "We can deliver the new stock by next week...",
    date: "2024-03-20",
    read: false,
    category: "stock",
  },
  {
    id: 4,
    from: "warehouse@example.com",
    subject: "Inventory Update Required",
    message: "Please update the inventory for...",
    date: "2024-03-19",
    read: true,
    category: "inventory",
  },
  {
    id: 4,
    from: "supplier@example.com",
    subject: "Re: Low stock alert - iPhone 14",
    message: "We can deliver the new stock by next week...",
    date: "2024-03-20",
    read: false,
    category: "stock",
  },
  {
    id: 5,
    from: "warehouse@example.com",
    subject: "Inventory Update Required",
    message: "Please update the inventory for...",
    date: "2024-03-19",
    read: true,
    category: "inventory",
  },
  // Add more mock emails...
];

function Inbox() {
  const [emails] = useState(mockEmails);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { products } = useProducts();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const filteredEmails = emails.filter(
    (email) =>
      (email.subject.toLowerCase().includes(search.toLowerCase()) ||
        email.from.toLowerCase().includes(search.toLowerCase())) &&
      (category === "all" || email.category === category)
  );

  const handleSendMessage = () => {
    if (!selectedProduct || !newMessage) {
      toast.error("Please select a product and write a message");
      return;
    }

    toast.success("Message sent to supplier");
    setNewMessage("");
    setSelectedProduct("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Email List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <div className="space-y-4 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={cn(
                  "p-4 rounded-lg cursor-pointer transition-colors",
                  email.read ? "bg-accent/50" : "bg-accent",
                  selectedEmail?.id === email.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{email.from}</p>
                    <p className="text-sm text-muted-foreground">
                      {email.subject}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(email.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Content and Reply */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            {selectedEmail ? "Email Details" : "New Message"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedEmail ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedEmail.subject}
                </h3>
                <p className="text-sm text-muted-foreground">
                  From: {selectedEmail.from}
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {new Date(selectedEmail.date).toLocaleDateString()}
                </p>
              </div>
              <div className="border-t pt-4">
                <p>{selectedEmail.message}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product for restock" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Write your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[100px]"
              />
              <Button className="w-full" onClick={handleSendMessage}>
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Inbox;
