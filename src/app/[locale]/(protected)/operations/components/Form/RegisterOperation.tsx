'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useConvexMutation } from '@convex-dev/react-query';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslate } from '@tolgee/react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { AutocompleteTags } from './AutocompleteTags';

function useFormSchema() {
  const { t } = useTranslate();

  return z.object({
    symbol: z.string().min(1, t('view.operations.form.validation.symbol')),
    type: z.enum(['buy', 'sell'], {
      required_error: t('view.operations.form.validation.type'),
    }),
    quantity: z.number().min(0.0001, t('view.operations.form.validation.quantity')),
    price: z.number().min(0.01, t('view.operations.form.validation.price')),
    date: z.string().min(1, t('view.operations.form.validation.date')),
    tags: z.array(z.string()).max(3, t('view.operations.form.validation.tagsMax')),
  });
}

type FormSchema = z.infer<ReturnType<typeof useFormSchema>>;

type EditingOperation = {
  _id: Id<'operations'>;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  date: number;
  tags: { id: Id<'operationTags'>; tag: string }[];
};

export interface RegisterOperationRef {
  setEditingOperation: (operation: EditingOperation | null) => void;
}

interface RegisterOperationProps {
  onEditingChange?: (editingId: Id<'operations'> | null) => void;
}

function resetForm(form: UseFormReturn<FormSchema>, operation: EditingOperation | null) {
  form.setFocus('symbol');

  const defaultValues: FormSchema = {
    symbol: '',
    type: 'buy',
    quantity: 0,
    price: 0,
    date: new Date().toISOString().split('T')[0],
    tags: [],
  };

  if (operation) {
    form.reset({
      symbol: operation.symbol,
      type: operation.type,
      quantity: operation.quantity,
      price: operation.price,
      date: new Date(operation.date).toISOString().split('T')[0],
      tags: operation.tags.map((tag) => tag.tag),
    });
  } else {
    form.reset(defaultValues);
  }
}

export const RegisterOperation = forwardRef<RegisterOperationRef, RegisterOperationProps>(
  ({ onEditingChange }, ref) => {
    const [editingOperation, setEditingOperationState] = useState<EditingOperation | null>(null);
    const { t } = useTranslate();
    const formSchema = useFormSchema();

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

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      setEditingOperation: (operation: EditingOperation | null) => {
        setEditingOperationState(operation);
        onEditingChange?.(operation?._id || null);
        resetForm(form, operation);
      },
    }));

    const { mutate: addOperation } = useMutation({
      mutationFn: useConvexMutation(api.mutations.operations.add),
      onSuccess: () => {
        resetForm(form, null);
      },
    });

    const { mutate: updateOperation } = useMutation({
      mutationFn: useConvexMutation(api.mutations.operations.update),
      onSuccess: () => {
        setEditingOperationState(null);
        onEditingChange?.(null);
        resetForm(form, null);
      },
    });

    const handleSubmit = (data: FormSchema) => {
      if (editingOperation) {
        updateOperation({
          id: editingOperation._id,
          ...data,
        });
      } else {
        addOperation(data);
      }
    };

    const handleCancelEdit = () => {
      setEditingOperationState(null);
      onEditingChange?.(null);
      resetForm(form, null);
    };

    const isEditing = !!editingOperation;

    return (
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`flex flex-col gap-4 p-4 border border-gray-200 h-[calc(100vh-64px)] overflow-y-auto border-r`}
      >
        <Form {...form}>
          <header className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {isEditing ? t('view.operations.form.titleEdit') : t('view.operations.form.titleNew')}
              </h2>
              {isEditing && (
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {t('view.operations.form.editMode')}
                  </span>
                </div>
              )}
            </div>
            <FormDescription>
              {isEditing ? t('view.operations.form.descriptionEdit') : t('view.operations.form.descriptionNew')}
            </FormDescription>
          </header>

          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('view.operations.form.symbol')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('view.operations.form.symbolPlaceholder')}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
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
                <FormLabel>{t('view.operations.form.type')}</FormLabel>
                <FormControl>
                  <RadioGroup {...field} onValueChange={field.onChange}>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <RadioGroupItem value="buy" id="buy" />
                        <Label htmlFor="buy" className="ml-2">
                          {t('view.operations.form.buy')}
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem value="sell" id="sell" />
                        <Label htmlFor="sell" className="ml-2">
                          {t('view.operations.form.sell')}
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
                <FormLabel>{t('view.operations.form.quantity')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t('view.operations.form.quantityPlaceholder')}
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
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
                <FormLabel>{t('view.operations.form.price')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t('view.operations.form.pricePlaceholder')}
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
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
                <FormLabel>{t('view.operations.form.date')}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AutocompleteTags name="tags" />

          <div className="flex gap-2 mt-4">
            <Button type="submit" className="flex-1 cursor-pointer">
              {isEditing ? t('view.operations.form.submitUpdate') : t('view.operations.form.submitAdd')}
            </Button>
            {isEditing && (
              <Button type="button" variant="outline" onClick={handleCancelEdit} className="cursor-pointer">
                {t('view.operations.form.cancel')}
              </Button>
            )}
          </div>
        </Form>
      </form>
    );
  },
);

RegisterOperation.displayName = 'RegisterOperation';
