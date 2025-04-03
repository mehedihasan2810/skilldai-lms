"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [subject, setSubject] = useState<string>("");
  const [proficiency, setProficiency] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/ai-learning-assistant/quiz?subject=${encodeURIComponent(subject)}&proficiency=${encodeURIComponent(proficiency)}`);
  };

  return (
   
    <div className="min-h-screen p-4 flex flex-col w-full" >
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle className="text-2xl">Quiz Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="proficiency">Proficiency Level</Label>
              <Select value={proficiency} onValueChange={setProficiency} required>
                <SelectTrigger id="proficiency">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Start Quiz
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}