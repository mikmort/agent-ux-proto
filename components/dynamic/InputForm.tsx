'use client';

import { useState } from 'react';
import { FormData } from '@/lib/types';
import { Button, Input, Label, Dropdown, Option } from '@fluentui/react-components';

interface InputFormProps {
  data: FormData;
  onSubmit?: (formId: string, data: Record<string, any>) => void;
}

export default function InputForm({ data, onSubmit }: InputFormProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.('form-submit', formValues);
  };

  const handleChange = (fieldId: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-4">
      {data.fields.map((field) => (
        <div key={field.id} className="flex flex-col gap-2">
          <Label htmlFor={field.id} required={field.required}>
            {field.label}
          </Label>

          {field.type === 'text' && (
            <Input
              id={field.id}
              placeholder={field.placeholder}
              value={formValues[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
            />
          )}

          {field.type === 'number' && (
            <Input
              id={field.id}
              type="number"
              placeholder={field.placeholder}
              value={formValues[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
            />
          )}

          {field.type === 'date' && (
            <Input
              id={field.id}
              type="date"
              value={formValues[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
            />
          )}

          {field.type === 'select' && field.options && (
            <Dropdown
              placeholder={field.placeholder}
              value={formValues[field.id] || ''}
              onOptionSelect={(e, data) => handleChange(field.id, data.optionValue)}
            >
              {field.options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Dropdown>
          )}
        </div>
      ))}

      <Button type="submit" appearance="primary">
        {data.submitLabel}
      </Button>
    </form>
  );
}
