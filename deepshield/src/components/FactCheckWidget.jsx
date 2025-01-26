import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const FactCheckWidget = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFactCheck = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Replace with your API endpoint
      const response = await fetch("https://api.example.com/fact-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Real-Time Fact-Check</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter news or article URL"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={handleFactCheck}
              className="w-full"
              disabled={!query || loading}
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Check Credibility"}
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 rounded-lg shadow-inner border"
              >
                {result.error ? (
                  <p className="text-red-600">Error: {result.error}</p>
                ) : (
                  <div>
                    <p className="font-semibold">Credibility Score:</p>
                    <p
                      className={`text-xl font-bold mt-2 ${
                        result.score > 70
                          ? "text-green-600"
                          : result.score > 40
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {result.score}%
                    </p>
                    <p className="text-sm mt-2 text-gray-600">{result.message}</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FactCheckWidget;
