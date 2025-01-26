import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProducts } from "@/contexts/ProductContext";
import { Plus, Search, Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
function ProductDialog({ product, onSubmit, mode = "add" }) {
  const [formData, setFormData] = useState(
    product || {
      title: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {mode === "add" ? "Add New Product" : "Edit Product"}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Product Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />
        <Input
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <Button type="submit" className="w-full">
          {mode === "add" ? "Add Product" : "Save Changes"}
        </Button>
      </form>
    </DialogContent>
  );
}

function Products() {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const [search, setSearch] = useState("");
  const { products, loading, addProduct, updateProduct, deleteProduct } =
    useProducts();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <ProductDialog onSubmit={addProduct} />
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={cn(
                "transition-all hover:shadow-lg",
                selectedId === product.id.toString() && "ring-2 ring-primary"
              )}
            >
              <CardHeader>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{product.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price}</span>
                  <span className="text-sm">Stock: {product.stock}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <ProductDialog
                    product={product}
                    onSubmit={(data) => updateProduct(product.id, data)}
                    mode="edit"
                  />
                </Dialog>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteProduct(product.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
