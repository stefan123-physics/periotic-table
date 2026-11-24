import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Element } from '../data/elements';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ElementDetailProps {
  getElementByAtomicNumber: (atomicNumber: number) => Element | undefined;
}

const ElementDetail: React.FC<ElementDetailProps> = ({ getElementByAtomicNumber }) => {
  const { atomicNumber } = useParams<{ atomicNumber: string }>();
  const navigate = useNavigate();

  const element = getElementByAtomicNumber(Number(atomicNumber));

  const handleBack = () => {
    navigate('/');
  };

  if (!element) {
    return (
      <div className="container mx-auto px-3 sm:px-4">
        <Alert variant="destructive">
          <AlertDescription>Element not found</AlertDescription>
        </Alert>
        <Button onClick={handleBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Periodic Table
        </Button>
      </div>
    );
  }

  const p = element.properties;
  const rows: [string, React.ReactNode][] = [
    ['Atomic Mass', p.atomicMass],
    ['Category', <span className="capitalize">{p.category}</span>],
  ];
  if (p.group != null) rows.push(['Group', p.group]);
  if (p.period != null) rows.push(['Period', p.period]);
  if (p.electronConfiguration) rows.push(['Electron Configuration', p.electronConfiguration]);
  if (p.density != null) rows.push(['Density', `${p.density} g/cm³`]);
  if (p.meltingPoint != null) rows.push(['Melting Point', `${p.meltingPoint} °C`]);
  if (p.boilingPoint != null) rows.push(['Boiling Point', `${p.boilingPoint} °C`]);

  return (
    <div className="container mx-auto px-3 sm:px-4">
      <div className="mx-auto w-full max-w-2xl">
        <Button
          onClick={handleBack}
          variant="outline"
          className="mb-4 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Periodic Table
        </Button>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <CardTitle className="text-2xl sm:text-3xl break-words dark:text-white">
                  {element.name}
                </CardTitle>
                <CardDescription className="dark:text-slate-300">
                  Atomic Number: {element.atomicNumber}
                </CardDescription>
              </div>
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-3xl sm:text-4xl font-bold dark:text-white">
                {element.symbol}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Properties</h3>
            <dl className="divide-y divide-slate-100 dark:divide-slate-700">
              {rows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 py-2 text-sm sm:text-base">
                  <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
                  <dd className="break-words text-slate-900 dark:text-slate-100">{value}</dd>
                </div>
              ))}
            </dl>

            <Separator className="my-4 dark:bg-slate-700" />

            <h3 className="text-lg font-semibold mb-2 dark:text-white">Earthly Items</h3>
            <div className="space-y-2">
              {element.earthItems.map((item, index) => (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-md">
                  <div className="font-medium dark:text-white">{item.name}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{item.use}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElementDetail;
