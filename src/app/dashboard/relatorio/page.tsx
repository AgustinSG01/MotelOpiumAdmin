'use client';

import * as React from 'react';
import { useControleFilters } from '@/store/controle-filters';
import { Button, Grid, TextField } from '@mui/material';
import { Stack } from '@mui/system';

// import { useLimpezaFilters } from '@/store/filters';
// import { Button } from '@mui/material';

// import { Plus as PlusIcon } from '@phosphor-s/react/dist/ssr/Plus';

import { type ControleData as InfoControle } from '@/types/types';
import useEmpregados from '@/hooks/use-empregados';
import useSuits from '@/hooks/use-suits';
import { CalcFinalEmpregadoTable } from '@/components/dashboard/controles/CalcFinalEmpregadoTable';
import { CalcFinalGerenteTable } from '@/components/dashboard/controles/CalcFinalGerenteTable';
import { CalcFinalRecepTable } from '@/components/dashboard/controles/CalcFinalRecepTable';
import { ConstantesTable } from '@/components/dashboard/controles/ConstantesTable';
import { ControlesTable } from '@/components/dashboard/controles/ControlesTable';
import { LavagemEmpregadoTable } from '@/components/dashboard/controles/LavagemEmpregadoTable';
import { LavagemGerenteTable } from '@/components/dashboard/controles/LavagemGerenteTable';
import { MediaEmpregadoTable } from '@/components/dashboard/controles/MediaEmpregadoTable';
import { MediaGerenteTable } from '@/components/dashboard/controles/MediaGerenteTable';
import { MessagesTable } from '@/components/dashboard/controles/MessagesTable';
import MonthAndYearSelector from '@/components/dashboard/controles/MonthAndYearSelector';

// import ControlInfo from '@/components/dashboard/limpezas/control-info';
// import { LimpezasFilters } from '@/components/dashboard/limpezas/limpezas-filters';
// import NewLimpeza from '@/components/dashboard/modalForms/NewLimpeza';

import axios from '../../../axios-config';

export interface Message {
  id: number;
  message: string;
  data: Date;
  directivo: {
    id: number;
    nome: string;
  };
  limpeza: {
    suit: {
      id: number;
      nome: string;
    };
  };
}

export interface Constantes {
  limpezas: number;
  servg: number;
  rec: number;
  ger: number;
  total: number;
}
export interface MediaGerente {
  id: number;
  nome: string;
  limpezas: number;
  controles: string;
}

export interface MediaEmpregado {
  id: number;
  nome: string;
  limpezas: number;
  controles: string;
  quantityControles: number;
}

export interface LavagemGerente {
  id: number;
  nome: string;
  faxinas: number;
  input: number;
  result: number;
}

export interface LavagemEmpregado {
  id: number;
  nome: string;
  limpezas: number;
}
export interface CalcFinalEmpreado {
  id: number;
  nome: string;
  nota: number;
  lavagem: number;
  solicita: boolean;
  faltou: boolean;
  faltou2: boolean;
  subtotal: number;
  total: number;
  zeros: number;
  pagamento: number;
}

export interface CalcFinalGerente {
  id: number;
  nome: string;
  nota: number;
  lavagem: number;
  solicita: boolean;
  faltou: boolean;
  faltou2: boolean;
  subtotal: number;
  total: number;
  zeros: number;
  pagamento: number;
}

export interface CalcFinalRecep {
  id: number;
  nome: string;
  nota: number;
  lavagem: number;
  solicita: boolean;
  faltou: boolean;
  faltou2: boolean;
  subtotal: number;
  total: number;
  zeros: number;
  pagamento: number;
}
export default function Page(): React.JSX.Element {
  // const { orderBy, empregado, gerente, suit, initialDate, finalDate, state } = useLimpezaFilters();

  const [controls, setControls] = React.useState<InfoControle[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [mediaGerentes, setMediaGerentes] = React.useState<MediaGerente[]>([]);
  const [mediaEmpregados, setMediaEmpregados] = React.useState<MediaEmpregado[]>([]);
  const [lavagemsGerentes, setLavagemsGerentes] = React.useState<LavagemGerente[]>([]);
  const [quantityFaxinaEmpregados, setQuantityFaxinaEmpregados] = React.useState<LavagemEmpregado[]>([]);
  const [calcFinalEmpregados, setCalcFinalEmpregados] = React.useState<CalcFinalEmpreado[]>([]);
  const [calcFinalGerentes, setCalcFinalGerentes] = React.useState<CalcFinalGerente[]>([]);
  const [calcFinalReceps, setCalcFinalReceps] = React.useState<CalcFinalRecep[]>([]);
  const [constantes, setConstantes] = React.useState<Constantes[]>([]);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [limpezas, setLimpezas] = React.useState<{ totalLimpezas: number; totalLimpezasManual: number | null }>();

  const {
    setGerenteList,
    setSuitList,
    setEmpregadoList,
    abastecScoreList,
    cheiroScoreList,
    empregadoList,
    faxinaScoreList,
    garagemScoreList,
    gerenteList,
    limpezaScoreList,
    manutScoreList,
    roupaScoreList,
    suitList,
    tvScoreList,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    resetFilters,
  } = useControleFilters();

  const { suits } = useSuits();
  const { empregados } = useEmpregados('limpeza');
  const { empregados: gerentes } = useEmpregados('gerente');

  const gerenteIds = React.useMemo(() => gerentes?.map((gerente) => gerente.id) || [], [gerentes]);

  const suitIds = React.useMemo(() => suits?.map((suit) => suit.id) || [], [suits]);

  const empregadoIds = React.useMemo(() => empregados?.map((empregado) => empregado.id) || [], [empregados]);

  async function getQuantityLimpezas(): Promise<void> {
    try {
      const response = await axios.get(
        `/statics/total-limpezas-manual-and-total?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
      );
      const data = response.data as { totalLimpezas: number; totalLimpezasManual: number | null };
      setLimpezas(data);
    } catch (error) {
      setLimpezas(undefined);
    }
  }

  async function updateLimpezas(): Promise<void> {
    try {
      await axios.post(`/statics/update-or-create-limpeza-manual`, {
        selectedMonth,
        selectedYear,
        totalLimpezasManual: limpezas?.totalLimpezasManual || limpezas?.totalLimpezas || 0,
      });
      await fetchData();
    } catch (error) {
      return;
    }
  }

  async function getControles(): Promise<void> {
    // const filters = orderBy.split(';');
    try {
      const response = await axios.get(`/controle?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`);
      const data: InfoControle[] = response.data as InfoControle[];
      setControls(data);
    } catch (error) {
      setControls([]);
    }
  }

  async function getMediaGerentes(): Promise<void> {
    try {
      const response = await axios.get(
        `/empregado/gerente/media?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
      );
      const data: MediaGerente[] = response.data as MediaGerente[];
      setMediaGerentes(data);
    } catch (error) {
      setMediaGerentes([]);
    }
  }

  async function getMediaEmpregado(): Promise<void> {
    try {
      const response = await axios.get(
        `/empregado/limpeza/media?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
      );
      const data: MediaEmpregado[] = response.data as MediaEmpregado[];
      setMediaEmpregados(data);
    } catch (error) {
      setMediaEmpregados([]);
    }
  }
  async function getConstantes(): Promise<void> {
    try {
      const response = await axios.get(
        `/statics/constantes?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
      );
      const data: Constantes[] = response.data as Constantes[];
      setConstantes(data);
    } catch (error) {
      setConstantes([]);
    }
  }

  async function getLavagemGerentes(): Promise<void> {
    try {
      const response = await axios.get(
        `/empregado/gerente/lavagem?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
      );
      const data: LavagemGerente[] = response.data as LavagemGerente[];
      setLavagemsGerentes(data);
    } catch (error) {
      setLavagemsGerentes([]);
    }
  }

  async function getControleWithFilters(): Promise<void> {
    const year = selectedYear;
    const month = selectedMonth;
    const suitsIds = suitList.length ? suitList.toString() : '';
    const gerentesIds = gerenteList.length ? gerenteList.toString() : '';
    const empregadosIds = empregadoList.length ? empregadoList.toString() : '';
    const limpezaScores = limpezaScoreList.length ? limpezaScoreList.toString() : '';
    const cheiroScores = cheiroScoreList.length ? cheiroScoreList.toString() : '';
    const manutScores = manutScoreList.length ? manutScoreList.toString() : '';
    const tvScores = tvScoreList.length ? tvScoreList.toString() : '';
    const roupaScores = roupaScoreList.length ? roupaScoreList.toString() : '';
    const garagemScores = garagemScoreList.length ? garagemScoreList.toString() : '';
    const faxinaScores = faxinaScoreList.length ? faxinaScoreList.toString() : '';
    const abastecScores = abastecScoreList.length ? abastecScoreList.toString() : '';

    try {
      const response = await axios.get(
        `/controle?selectedYear=${year}&selectedMonth=${month}&suitList=${suitsIds}&limpezaScoreList=${limpezaScores}&cheiroScoreList=${cheiroScores}&manutScoreList=${manutScores}&tvScoreList=${tvScores}&roupaScoreList=${roupaScores}&garagemScoreList=${garagemScores}&faxinaScoreList=${faxinaScores}&abastecScoreList=${abastecScores}&gerenteList=${gerentesIds}&empregadoList=${empregadosIds}`
      );
      const data: InfoControle[] = response.data as InfoControle[];
      setControls(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return;
    }
  }

  async function getQuantityFaxinaEmpregados(): Promise<void> {
    try {
      const response = await axios.get(
        `/empregado/limpeza/quantityFaxinas?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
      );
      const data: LavagemEmpregado[] = response.data as LavagemEmpregado[];
      setQuantityFaxinaEmpregados(data);
    } catch (error) {
      return;
    }
  }

  async function getCalcFinalEmpregados(): Promise<void> {
    try {
      const response = await axios.get(
        `/empregado/limpeza/finalcalc?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
      );
      const data: CalcFinalEmpreado[] = response.data as CalcFinalEmpreado[];
      setCalcFinalEmpregados(data);
    } catch (error) {
      return;
    }
  }
  async function getCalcFinalGerentes(): Promise<void> {
    try {
      const response = await axios.get(
        `/empregado/gerente/finalcalc?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
      );
      const data: CalcFinalGerente[] = response.data as CalcFinalGerente[];
      setCalcFinalGerentes(data);
    } catch (error) {
      return;
    }
  }

  async function getCalcFinalRecep(): Promise<void> {
    try {
      const response = await axios.get(
        `/empregado/recep/finalcalc?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
      );
      const data: CalcFinalRecep[] = response.data as CalcFinalRecep[];
      setCalcFinalReceps(data);
    } catch (error) {
      return;
    }
  }

  const handleApplyInputs = async (data: { gerente_id: number; value: number }[]): Promise<void> => {
    try {
      const year = selectedYear;
      const month = selectedMonth;

      await axios.post('/inputs/inputGerente', {
        data,
        selectedYear: year,
        selectedMonth: month,
      });

      // Aquí podrías mostrar un mensaje de éxito o actualizar el estado
      // Por ejemplo, recargar los datos de la tabla
      await getLavagemGerentes();
    } catch (error) {
      return;
      // Manejar error - mostrar mensaje al usuario
    }
  };

  async function getMessages(): Promise<void> {
    try {
      const response = await axios.get(
        `/comments/allMessagesWithInfo?selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
      );
      const responseData = response.data as Message[];
      setMessages(responseData);
    } catch (_error) {
      return;
    }
  }

  async function updateSolicita(id: number, value: boolean): Promise<void> {
    try {
      const year = selectedYear;
      const month = selectedMonth; // getMonth() retorna 0-11

      await axios.post('/inputs/solicitaEmpregado', {
        empregado_id: id,
        value,
        selectedYear: year,
        selectedMonth: month,
      });

      // Aquí podrías mostrar un mensaje de éxito o actualizar el estado
      // Por ejemplo, recargar los datos de la tabla
      await getCalcFinalEmpregados();
    } catch (error) {
      return;
      // Manejar error - mostrar mensaje al usuario
    }
  }
  async function updateSolicitaGerente(id: number, value: boolean): Promise<void> {
    try {
      const year = selectedYear;
      const month = selectedMonth;

      await axios.post('/inputs/solicitaGerente', {
        gerente_id: id,
        value,
        selectedYear: year,
        selectedMonth: month,
      });

      // Aquí podrías mostrar un mensaje de éxito o actualizar el estado
      // Por ejemplo, recargar los datos de la tabla
      await getCalcFinalGerentes();
    } catch (error) {
      return;
      // Manejar error - mostrar mensaje al usuario
    }
  }

  async function updateFaltaOneEmpregado(id: number, value: boolean): Promise<void> {
    try {
      const year = selectedYear;
      const month = selectedMonth;

      await axios.post('/inputs/faltaoneEmpregado', {
        empregado_id: id,
        value,
        selectedYear: year,
        selectedMonth: month,
      });

      // Aquí podrías mostrar un mensaje de éxito o actualizar el estado
      // Por ejemplo, recargar los datos de la tabla
      await getCalcFinalEmpregados();
    } catch (error) {
      return;
      // Manejar error - mostrar mensaje al usuario
    }
  }

  async function updateFaltaTwoEmpregado(id: number, value: boolean): Promise<void> {
    try {
      const year = selectedYear;
      const month = selectedMonth;

      await axios.post('/inputs/faltatwoEmpregado', {
        empregado_id: id,
        value,
        selectedYear: year,
        selectedMonth: month,
      });

      // Aquí podrías mostrar un mensaje de éxito o actualizar el estado
      // Por ejemplo, recargar los datos de la tabla
      await getCalcFinalEmpregados();
    } catch (error) {
      return;
      // Manejar error - mostrar mensaje al usuario
    }
  }

  async function updateFaltaOneGerente(id: number, value: boolean): Promise<void> {
    try {
      const year = selectedYear;
      const month = selectedMonth;

      await axios.post('/inputs/faltaoneGerente', {
        gerente_id: id,
        value,
        selectedYear: year,
        selectedMonth: month,
      });

      // Aquí podrías mostrar un mensaje de éxito o actualizar el estado
      // Por ejemplo, recargar los datos de la tabla
      await getCalcFinalGerentes();
    } catch (error) {
      return;
      // Manejar error - mostrar mensaje al usuario
    }
  }

  async function updateFaltaTwoGerente(id: number, value: boolean): Promise<void> {
    try {
      const year = selectedYear;
      const month = selectedMonth;

      await axios.post('/inputs/faltatwoGerente', {
        gerente_id: id,
        value,
        selectedYear: year,
        selectedMonth: month,
      });

      // Aquí podrías mostrar un mensaje de éxito o actualizar el estado
      // Por ejemplo, recargar los datos de la tabla
      await getCalcFinalGerentes();
    } catch (error) {
      return;
      // Manejar error - mostrar mensaje al usuario
    }
  }

  async function updateSolicitaRecep(id: number, value: boolean): Promise<void> {
    try {
      const year = selectedYear;
      const month = selectedMonth;

      await axios.post('/inputs/solicitaRecep', {
        gerente_id: id,
        value,
        selectedYear: year,
        selectedMonth: month,
      });

      // Aquí podrías mostrar un mensaje de éxito o actualizar el estado
      // Por ejemplo, recargar los datos de la tabla
      await getCalcFinalRecep();
    } catch (error) {
      return;
      // Manejar error - mostrar mensaje al usuario
    }
  }

  async function updateFaltaOneRecep(id: number, value: boolean): Promise<void> {
    try {
      const year = selectedYear;
      const month = selectedMonth;

      await axios.post('/inputs/faltaoneRecep', {
        gerente_id: id,
        value,
        selectedYear: year,
        selectedMonth: month,
      });

      // Aquí podrías mostrar un mensaje de éxito o actualizar el estado
      // Por ejemplo, recargar los datos de la tabla
      await getCalcFinalRecep();
    } catch (error) {
      return;
      // Manejar error - mostrar mensaje al usuario
    }
  }

  async function updateFaltaTwoRecep(id: number, value: boolean): Promise<void> {
    try {
      const year = selectedYear;
      const month = selectedMonth;

      await axios.post('/inputs/faltatwoRecep', {
        gerente_id: id,
        value,
        selectedYear: year,
        selectedMonth: month,
      });

      // Aquí podrías mostrar un mensaje de éxito o actualizar el estado
      // Por ejemplo, recargar los datos de la tabla
      await getCalcFinalRecep();
    } catch (error) {
      return;
      // Manejar error - mostrar mensaje al usuario
    }
  }
  function setIds() {
    if (gerenteIds.length) setGerenteList(gerenteIds);
    if (suitIds.length) setSuitList(suitIds);
    if (empregadoIds.length) setEmpregadoList(empregadoIds);
  }

  async function withoutFilters(): Promise<void> {
    resetFilters();
    await getControles();
    setIds();
  }

  React.useEffect(() => {
    if (gerenteIds.length) setGerenteList(gerenteIds);
    if (suitIds.length) setSuitList(suitIds);
    if (empregadoIds.length) setEmpregadoList(empregadoIds);
  }, [gerenteIds, suitIds, empregadoIds, setGerenteList, setSuitList, setEmpregadoList]);

  async function fetchData(): Promise<void> {
    try {
      setLoading(true);
      await getControles();
      await getMediaGerentes();
      await getMediaEmpregado();
      await getLavagemGerentes();
      await getQuantityFaxinaEmpregados();
      await getCalcFinalEmpregados();
      await getCalcFinalGerentes();
      await getCalcFinalRecep();
      await getConstantes();
      await getMessages();
      await getQuantityLimpezas();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void fetchData();
  }, []);

  return (
    <Grid container spacing={3} sx={{ paddingX: 0 }}>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
        <MonthAndYearSelector
          initialMonth={selectedMonth}
          initialYear={selectedYear}
          onDateChange={(year, month) => {
            setSelectedYear(year);
            setSelectedMonth(month);
          }}
          onApply={fetchData}
        />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
        <Stack direction="row" spacing={4} sx={{ paddingX: 0, justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            id="total-limpezas"
            label="Limpeza do banco de dados"
            disabled
            value={limpezas?.totalLimpezas || 0}
          />
          {'>'}
          <TextField
            id="total-limpezas-manual"
            label="Limpezas inseridas manualmente"
            defaultValue={limpezas?.totalLimpezasManual || limpezas?.totalLimpezas}
            value={limpezas?.totalLimpezasManual || limpezas?.totalLimpezas || 0}
            onChange={(e) => {
              setLimpezas({
                totalLimpezas: limpezas?.totalLimpezas ?? 0,
                totalLimpezasManual: Number(e.target.value) || 0,
              });
            }}
          />
          <Button onClick={updateLimpezas}>Aplicar</Button>
        </Stack>
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingX: 0 }} item>
        <ConstantesTable loading={loading} rows={constantes} />
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingX: 0 }} item>
        <MessagesTable loading={loading} rows={messages} />
      </Grid>
      {/* <LimpezasFilters applyFilters={getLimpezas} withoutFilters={withoutFilters} /> */}
      <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingX: 0 }} item>
        <MediaGerenteTable loading={loading} count={mediaGerentes.length} rows={mediaGerentes} />
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingX: 0 }} item>
        <MediaEmpregadoTable loading={loading} count={mediaEmpregados.length} rows={mediaEmpregados} />
      </Grid>
      <Grid xs={12} sm={12} md={7} lg={7} xl={7} sx={{ paddingX: 0 }} item>
        <LavagemGerenteTable
          loading={loading}
          count={lavagemsGerentes.length}
          rows={lavagemsGerentes}
          onApply={handleApplyInputs}
        />
      </Grid>
      <Grid xs={12} sm={12} md={5} lg={5} xl={5} sx={{ paddingX: 0 }} item>
        <LavagemEmpregadoTable
          loading={loading}
          count={quantityFaxinaEmpregados.length}
          rows={quantityFaxinaEmpregados}
        />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingX: 0 }} item>
        <CalcFinalEmpregadoTable
          updateFaltaOne={updateFaltaOneEmpregado}
          updateFaltaTwo={updateFaltaTwoEmpregado}
          changeSolicita={updateSolicita}
          loading={loading}
          count={calcFinalEmpregados.length}
          rows={calcFinalEmpregados}
        />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingX: 0 }} item>
        <CalcFinalRecepTable
          changeFalta={updateFaltaOneRecep}
          changeFaltaTwo={updateFaltaTwoRecep}
          changeSolicita={updateSolicitaRecep}
          loading={loading}
          count={calcFinalReceps.length}
          rows={calcFinalReceps}
        />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingX: 0 }} item>
        <CalcFinalGerenteTable
          changeSolicita={updateSolicitaGerente}
          loading={loading}
          count={calcFinalGerentes.length}
          rows={calcFinalGerentes}
          changeFalta={updateFaltaOneGerente}
          changeFaltaTwo={updateFaltaTwoGerente}
        />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingX: 0 }} item>
        <ControlesTable
          count={controls.length}
          rows={controls}
          loading={loading}
          empregados={empregados}
          suits={suits}
          gerentes={gerentes}
          getControles={getControleWithFilters}
          resetFilters={withoutFilters}
        />
      </Grid>
    </Grid>
  );
}
