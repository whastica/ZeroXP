import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui";
import { Badge } from "../components/ui";
import { Button } from "../components/ui";
import JobDetailModal from "./JobDetailModal";

export default function JobCard({ job }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="
          cursor-pointer select-none transition-all
          hover:shadow-xl hover:-translate-y-1
          bg-white dark:bg-[#121212]
          dark:hover:bg-[#1a1a1a]
          border border-gray-200 dark:border-gray-800
        "
      >
        <CardHeader>
          <CardTitle className="text-lg font-bold">{job.title}</CardTitle>

          <div className="flex gap-2 flex-wrap mt-2">
            {job.tags?.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm opacity-90 mt-2">
            {job.description.slice(0, 120)}...
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm font-semibold text-primary">
              💰 {job.salary}
            </div>

            <Button
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              Ver más
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <JobDetailModal open={open} onClose={() => setOpen(false)} job={job} />
    </>
  );
}
