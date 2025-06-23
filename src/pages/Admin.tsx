import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useContactMessages } from "@/hooks/useContactMessages";
import { useSupabaseProducts } from "@/hooks/useSupabaseProducts";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  Package,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductForm from "@/components/ProductForm";

const Admin = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const {
    messages,
    loading: messagesLoading,
    fetchMessages,
    markAsRead,
  } = useContactMessages();
  const {
    products,
    loading: productsLoading,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useSupabaseProducts();
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [hasFetchedMessages, setHasFetchedMessages] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isAdmin && !hasFetchedMessages) {
      console.log("Admin logged in, attempting to fetch messages...");
      setDebugInfo("Attempting to fetch messages...");
      fetchMessages()
        .then(() => {
          setDebugInfo("Messages fetch completed");
          setHasFetchedMessages(true);
        })
        .catch((error) => {
          console.error("Failed to fetch messages:", error);
          setDebugInfo(`Messages fetch failed: ${error.message}`);
          setHasFetchedMessages(true);
        });
    }
  }, [isAdmin, hasFetchedMessages, fetchMessages]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-accent/30 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
      } catch (error) {
        console.error("Delete product error:", error);
        toast({
          title: "Error",
          description: "Failed to delete product. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markAsRead(messageId);
    } catch (error) {
      console.error("Mark as read error:", error);
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive",
      });
    }
  };

  const handleRefreshMessages = () => {
    console.log("Refreshing messages...");
    setDebugInfo("Refreshing messages...");
    fetchMessages()
      .then(() => {
        setDebugInfo("Messages refresh completed");
      })
      .catch((error) => {
        console.error("Failed to refresh messages:", error);
        setDebugInfo(`Messages refresh failed: ${error.message}`);
      });
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-accent/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your products and customer messages
          </p>
          {debugInfo && (
            <p className="text-sm text-gray-500 mt-2">Debug: {debugInfo}</p>
          )}
        </div>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Contact Messages
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Contact Messages ({messages.length})
                  </CardTitle>
                  <Button
                    onClick={handleRefreshMessages}
                    variant="outline"
                    size="sm"
                    disabled={messagesLoading}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        messagesLoading ? "animate-spin" : ""
                      }`}
                    />
                    {messagesLoading ? "Loading..." : "Refresh"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="text-center py-8">
                    <div className="text-gray-500">Loading messages...</div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-500 mb-4">
                      No messages available at the moment
                    </div>
                    <Button onClick={handleRefreshMessages} variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {messages.map((message) => (
                          <TableRow key={message.id}>
                            <TableCell className="font-medium">
                              {message.name}
                            </TableCell>
                            <TableCell>{message.email}</TableCell>
                            <TableCell
                              className="max-w-xs truncate"
                              title={message.message}
                            >
                              {message.message}
                            </TableCell>
                            <TableCell>
                              {formatDate(message.created_at)}
                            </TableCell>
                            <TableCell>
                              {message.read ? (
                                <Badge variant="secondary">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Read
                                </Badge>
                              ) : (
                                <Badge variant="destructive">
                                  <EyeOff className="h-3 w-3 mr-1" />
                                  Unread
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {!message.read && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(message.id)}
                                >
                                  Mark as Read
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Products Management</h2>
                <Button
                  onClick={() => {
                    setShowProductForm(true);
                    setEditingProduct(null);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {showProductForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProductForm
                      product={editingProduct}
                      onSave={async (formData) => {
                        try {
                          if (editingProduct) {
                            await updateProduct(editingProduct.id, formData);
                          } else {
                            await addProduct(formData);
                          }
                          setShowProductForm(false);
                          setEditingProduct(null);
                        } catch (error) {
                          console.error("Save error:", error);
                        }
                      }}
                      onCancel={() => {
                        setShowProductForm(false);
                        setEditingProduct(null);
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>All Products ({products.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {productsLoading ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500">Loading products...</div>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="mb-4">No products yet</div>
                      <Button
                        onClick={() => setShowProductForm(true)}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Product
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">
                                {product.name}
                              </TableCell>
                              <TableCell className="capitalize">
                                {product.category}
                              </TableCell>
                              <TableCell>₹{product.price}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    product.in_stock ? "default" : "secondary"
                                  }
                                >
                                  {product.in_stock
                                    ? "In Stock"
                                    : "Out of Stock"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setEditingProduct(product);
                                      setShowProductForm(true);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteProduct(product.id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
