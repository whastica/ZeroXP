// components/JobDetailModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // 👈 corregido
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui";

export default function JobDetailModal({ open, onClose, job }) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{job.title}</DialogTitle>
          <DialogDescription>
            Información completa de la oferta
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <p className="text-sm opacity-90">{job.description}</p>

          <div className="flex gap-2 flex-wrap">
            {job.tags?.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="text-lg font-semibold text-primary">
            💰 {job.salary}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} variant="secondary">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
