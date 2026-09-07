<script setup>
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-50 p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Management Asset</CardTitle>
        <CardDescription>Masukkan detail data aset baru di bawah ini.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <label class="text-sm font-medium mb-1 block">Nama Aset</label>
          <Input placeholder="Contoh: Laptop Macbook Pro" />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Simpan Data</Button>
      </CardFooter>
    </Card>
  </div>
</template>