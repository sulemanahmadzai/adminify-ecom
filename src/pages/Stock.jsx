import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Plus, Minus, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Import your ProductContext hook:
import { useProducts } from "@/contexts/ProductContext";

function Stock() {
  const { products, updateProduct } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Corrected handleUpdateStock to ensure we can increment/decrement properly
  async function handleUpdateStock(productId, change) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const newStock = Math.max(0, product.stock + change);

    // New product object with updated stock
    const updatedProduct = {
      ...product,
      stock: newStock,
    };

    // Update it in context (assumes updateProduct modifies the local state)
    await updateProduct(productId, updatedProduct);

    // Show a toast (optional)
    toast.success(
      `Stock updated: "${product.title}" is now ${newStock} in stock.`
    );
  }

  // Filtered products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // Unique category list
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stock Management</h1>
      </div>

      {/* Search & Category Filter */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
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
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-md overflow-hidden">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Thumbnail</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const isLowStock = product.stock < 10;
              return (
                <tr
                  key={product.id}
                  className="border-b last:border-b-0 hover:bg-accent/10 transition-colors"
                >
                  {/* PRODUCT TITLE */}
                  <td className="px-4 py-3">
                    <p className="font-semibold">{product.title}</p>
                  </td>

                  {/* PRODUCT CATEGORY */}
                  <td className="px-4 py-3">{product.category}</td>

                  {/* PRODUCT THUMBNAIL */}
                  <td className="px-4 py-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  </td>

                  {/* STOCK & LOW-STOCK ALERT */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-bold text-lg",
                          isLowStock && "text-red-600"
                        )}
                      >
                        {product.stock}
                      </span>

                      {/* Show alert dialog if stock is <10 */}
                      {isLowStock && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Low Stock Alert
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {product.title} is running low on stock. Would
                                you like to restock this item?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  handleUpdateStock(product.id, 50);
                                  toast.success("Restock order placed");
                                }}
                              >
                                Restock
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </td>

                  {/* INCREASE / DECREASE BUTTONS */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleUpdateStock(product.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleUpdateStock(product.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* If no products match filters, show something */}
        {filteredProducts.length === 0 && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Stock;
