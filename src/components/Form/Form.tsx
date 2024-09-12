import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import Input from 'components/Input';
import Textarea from 'components/Textarea';
import { useToast } from 'hooks/useToast';
import { LoaderCircle, SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { tv } from 'tailwind-variants';
import { z } from 'zod';

const REQUIRED_MESSAGE = 'Este campo es requerido';
const schema = z.object({
  titulo: z.string().min(1, { message: REQUIRED_MESSAGE }),
  organizacion: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined || value === '') return true;
        return z.string().email().safeParse(value).success;
      },
      {
        message: 'El email debe ser válido',
      },
    ),
  telefono: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined || value === '') return true;
        return /^\d{7}$/.test(value);
      },
      {
        message: 'El teléfono debe tener 7 dígitos',
      },
    ),
  direccion: z.string().optional(),
  descripcion: z.string().min(1, { message: REQUIRED_MESSAGE }).max(256, { message: 'Máximo 256 caracteres' }),
});

export type Schema = z.infer<typeof schema>;

const formStyle = tv({
  slots: {
    loader: 'w-6 h-8 animate-spin',
    icon: 'w-6 h-8',
  },
});

const { loader, icon } = formStyle();

function Form() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    reset,
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const onSubmit = handleSubmit(async (data) => {
    const isValid = await trigger();
    if (isValid) {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      setLoading(true);

      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        toast({
          title: 'Error',
          description: 'Hubo un error al crear el proyecto',
          variant: 'error',
        });
      } else {
        toast({
          title: 'Proyecto creado',
          description: 'El proyecto fue creado con éxito',
          variant: 'success',
        });
        reset();
      }

      setLoading(false);
    }
  });
  return (
    <form method="POST" className="flex flex-col bg-white p-6 max-w-[572px]" onSubmit={onSubmit}>
      <Input {...register('titulo')} errorMessage={errors.titulo?.message} aria-invalid={Boolean(errors.titulo)} />
      <Input
        {...register('organizacion')}
        errorMessage={errors.organizacion?.message}
        aria-invalid={Boolean(errors.organizacion)}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Input {...register('email')} errorMessage={errors.email?.message} aria-invalid={Boolean(errors.email)} />
        <Input {...register('telefono')} errorMessage={errors.telefono?.message} aria-invalid={Boolean(errors.telefono)} />
      </div>
      <Input {...register('direccion')} errorMessage={errors.direccion?.message} aria-invalid={Boolean(errors.direccion)} />
      <Textarea
        {...register('descripcion')}
        errorMessage={errors.descripcion?.message}
        aria-invalid={Boolean(errors.descripcion)}
        rows={5}
      />

      <Button type="submit">
        Enviar{loading ? <LoaderCircle className={loader()} /> : <SendHorizonal className={icon()} />}
      </Button>
    </form>
  );
}

export default Form;
