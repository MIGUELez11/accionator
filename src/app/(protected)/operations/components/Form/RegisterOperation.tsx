'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useConvexMutation } from '@convex-dev/react-query';
import { api } from '@convex/_generated/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AutocompleteTags } from './AutocompleteTags';

const formSchema = z.object({
  symbol: z.string().min(1, 'Símbolo es requerido'),
  type: z.enum(['buy', 'sell'], {
    required_error: 'Tipo de operación es requerido',
  }),
  quantity: z.number().min(Number.EPSILON, 'Cantidad debe ser mayor a 0'),
  price: z.number().min(Number.EPSILON, 'Precio debe ser mayor a 0'),
  date: z.string().min(1, 'Fecha es requerida'),
  tags: z.array(z.string().min(1, 'Etiqueta es requerida')).max(3, 'Máximo 3 etiquetas'),
});

type FormSchema = z.infer<typeof formSchema>;

export function RegisterOperation() {
  const form = useForm<FormSchema>({
    defaultValues: {
      symbol: '',
      type: 'buy',
      quantity: 0,
      price: 0,
      date: new Date().toISOString().split('T')[0],
      tags: [],
    },
    resolver: zodResolver(formSchema),
  });

  const { mutate: addOperation } = useMutation({
    mutationFn: useConvexMutation(api.mutations.operations.add),
    onSuccess: () => {
      form.setFocus('symbol');
      form.reset();
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        addOperation(data);
      })}
      className={`flex flex-col gap-4 p-4 border border-gray-200 h-[calc(100vh-64px)] overflow-y-auto border-r`}
    >
      <Form {...form}>
        <header className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Nueva operación</h2>
          <FormDescription>Añade una nueva operación de compra o venta</FormDescription>
        </header>

        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Símbolo</FormLabel>
              <FormControl>
                <Input placeholder="Ej. AAPL" {...field} onChange={(e) => field.onChange(e.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de operación</FormLabel>
              <FormControl>
                <RadioGroup {...field} onValueChange={field.onChange}>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <RadioGroupItem value="buy" id="buy" />
                      <Label htmlFor="buy" className="ml-2">
                        Compra
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="sell" id="sell" />
                      <Label htmlFor="sell" className="ml-2">
                        Venta
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio unitario ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AutocompleteTags name="tags" />

        <Button type="submit" className="w-full mt-4 cursor-pointer">
          Añadir Operación
        </Button>
      </Form>
    </form>
  );
}
