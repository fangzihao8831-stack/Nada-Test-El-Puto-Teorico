"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Loader2, Search, Info } from "lucide-react";
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
import { CLASES_PERMISO } from "@/lib/constants";
import { validateNIF, formatNIF } from "@/lib/dgt/validate-nif";
import type { ConsultaNotaInput, ConsultaNotaResult } from "@/types/dgt";

function isValidDate(value: string): boolean {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return false;
  const [, day, month, year] = match;
  const date = new Date(+year, +month - 1, +day);
  return (
    date.getFullYear() === +year &&
    date.getMonth() === +month - 1 &&
    date.getDate() === +day
  );
}

function ddmmyyyyToISO(value: string): string {
  const [day, month, year] = value.split("/");
  return `${year}-${month}-${day}`;
}

function autoFormatDate(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

const consultaSchema = z.object({
  nif: z.string().min(1, "Obligatorio").refine(validateNIF, {
    message: "NIF/NIE no válido",
  }),
  fechaExamen: z
    .string()
    .min(1, "Obligatorio")
    .refine(isValidDate, { message: "DD/MM/AAAA" }),
  clasePermiso: z.string().min(1, "Obligatorio"),
  fechaNacimiento: z
    .string()
    .min(1, "Obligatorio")
    .refine(isValidDate, { message: "DD/MM/AAAA" }),
});

type ConsultaFormData = z.infer<typeof consultaSchema>;

export interface ConsultaFormInput {
  clasePermiso: string;
  fechaExamen: string; // DD/MM/YYYY as entered by user
}

interface ConsultaNotaFormProps {
  onResult: (result: ConsultaNotaResult, input: ConsultaFormInput) => void;
}

export function ConsultaNotaForm({ onResult }: ConsultaNotaFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ConsultaFormData>({
    resolver: zodResolver(consultaSchema),
    defaultValues: {
      clasePermiso: "B",
    },
  });

  const clasePermiso = watch("clasePermiso");

  async function onSubmit(data: ConsultaFormData) {
    setLoading(true);
    setError(null);

    try {
      const payload: ConsultaNotaInput = {
        nif: data.nif,
        fechaExamen: ddmmyyyyToISO(data.fechaExamen),
        clasePermiso: data.clasePermiso,
        fechaNacimiento: ddmmyyyyToISO(data.fechaNacimiento),
      };

      const response = await fetch("/api/dgt/consulta-nota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        setError(json.error || "Error al consultar la DGT");
        return;
      }

      onResult(json.data, {
        clasePermiso: data.clasePermiso,
        fechaExamen: data.fechaExamen,
      });
    } catch {
      setError(
        "No se pudo conectar con el servidor. Inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="nif">NIF / NIE</Label>
            <Input
              id="nif"
              placeholder="12345678Z"
              className="h-11 text-base"
              {...register("nif")}
              onChange={(e) => {
                const formatted = formatNIF(e.target.value);
                setValue("nif", formatted, { shouldValidate: false });
              }}
              maxLength={9}
              autoComplete="off"
            />
            {errors.nif && (
              <p className="text-sm text-destructive">{errors.nif.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="clasePermiso">Permiso</Label>
            <Select
              value={clasePermiso}
              onValueChange={(value) =>
                setValue("clasePermiso", value, { shouldValidate: true })
              }
            >
              <SelectTrigger id="clasePermiso" className="h-11 w-24 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CLASES_PERMISO.map((clase) => (
                  <SelectItem key={clase.value} value={clase.value}>
                    {clase.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="fechaExamen">Fecha de examen</Label>
            <Input
              id="fechaExamen"
              placeholder="DD/MM/AAAA"
              className="h-11 text-base"
              {...register("fechaExamen")}
              onChange={(e) => {
                const formatted = autoFormatDate(e.target.value);
                setValue("fechaExamen", formatted, { shouldValidate: false });
              }}
              maxLength={10}
            />
            {errors.fechaExamen && (
              <p className="text-sm text-destructive">
                {errors.fechaExamen.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
            <Input
              id="fechaNacimiento"
              placeholder="DD/MM/AAAA"
              className="h-11 text-base"
              {...register("fechaNacimiento")}
              onChange={(e) => {
                const formatted = autoFormatDate(e.target.value);
                setValue("fechaNacimiento", formatted, {
                  shouldValidate: false,
                });
              }}
              maxLength={10}
            />
            {errors.fechaNacimiento && (
              <p className="text-sm text-destructive">
                {errors.fechaNacimiento.message}
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2.5">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        <Button type="submit" className="h-11 w-full text-base" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 size-5 animate-spin" />
              Consultando DGT...
            </>
          ) : (
            <>
              <Search className="mr-2 size-5" />
              Consultar resultado
            </>
          )}
        </Button>
      </form>

      <div className="mt-4 flex items-start gap-2 text-xs leading-normal text-muted-foreground/70">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        <span>
          Disponible a las 17:00 del día del examen, durante 15 días. El NIF
          no se almacena.
        </span>
      </div>
    </div>
  );
}
