import { useState } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Gauge } from "react-gauge-chart";

export default function ImageDetect() {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDetect = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.get("https://api.sightengine.com/1.0/check.json", {
        params: {
          url: imageUrl,
          models: "deepfake",
          api_user: "385015769",
          api_secret: "RSPNFXVSf5Jo7nDwetaghyRdD8GFXAbK",
        },
      });
      setResult(response.data.type.deepfake);
    } catch (err) {
      setError("Failed to analyze the image. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <Card className="w-full max-w-md p-6 shadow-2xl rounded-2xl bg-white">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Deepfake Image Detector</h2>
          <Input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleDetect} disabled={!imageUrl || loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
            {loading ? "Detecting..." : "Detect Deepfake"}
          </Button>
          {result !== null && (
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold text-gray-700">Deepfake Confidence Score:</p>
              <Gauge
                nrOfLevels={20}
                percent={result}
                colors={["#00ff00", "#ffcc00", "#ff0000"]}
                arcWidth={0.3}
                textColor="#000"
                animate={true}
              />
              <p className="mt-4 text-xl font-bold text-gray-900">{(result * 100).toFixed(2)}%</p>
            </div>
          )}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
