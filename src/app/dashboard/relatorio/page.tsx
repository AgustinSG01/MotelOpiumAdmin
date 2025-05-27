'use client';

import * as React from 'react';
import { useControleFilters } from '@/store/controle-filters';
import { Grid } from '@mui/material';
// import { useLimpezaFilters } from '@/store/filters';
// import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { Plus as PlusIcon } from '@phosphor-s/react/dist/ssr/Plus';

import { type ControleData as InfoControle } from '@/types/types';
import useEmpregados from '@/hooks/use-empregados';
import useSuits from '@/hooks/use-suits';
import { ControlesTable } from '@/components/dashboard/controles/ControlesTable';

// import ControlInfo from '@/components/dashboard/limpezas/control-info';
// import { LimpezasFilters } from '@/components/dashboard/limpezas/limpezas-filters';
// import NewLimpeza from '@/components/dashboard/modalForms/NewLimpeza';

import axios from '../../../axios-config';

export default function Page(): React.JSX.Element {
  // const { orderBy, empregado, gerente, suit, initialDate, finalDate, state } = useLimpezaFilters();

  const [controls, setControls] = React.useState<InfoControle[]>([]);
  const [loading, setLoading] = React.useState(false);
  //   const [control, setControl] = React.useState<Controle>();
  // const [showModal, setShowModal] = React.useState({
  //   control: false,
  //   new: false,
  // });

  React.useEffect(() => {
    void getLimpezas();
  }, []);

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
  } = useControleFilters();
  const { suits } = useSuits();
  const { empregados } = useEmpregados('limpeza');
  const { empregados: gerentes } = useEmpregados('gerente');

  const gerenteIds = React.useMemo(() => gerentes?.map((gerente) => gerente.id) || [], [gerentes]);

  const suitIds = React.useMemo(() => suits?.map((suit) => suit.id) || [], [suits]);

  const empregadoIds = React.useMemo(() => empregados?.map((empregado) => empregado.id) || [], [empregados]);

  async function getLimpezas(): Promise<void> {
    // const filters = orderBy.split(';');
    try {
      setLoading(true);
      const response = await axios.get(`/controle`);
      const data: InfoControle[] = response.data as InfoControle[];
      setControls(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function getControleWithFilters(): Promise<void> {
    /**
      selectedYear,
    selectedMonth,
    suitList,
    limpezaScoreList,
    cheiroScoreList,
    manutScoreList,
    tvScoreList,
    roupaScoreList,
    garagemScoreList,
    faxinaScoreList,
    abastecScoreList,
    gerenteList,
    empregadoList,
     */
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
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

  async function deleteLimpeza(id: number, stateLimpeza: string): Promise<void> {
    try {
      setLoading(true);
      await axios.delete(`/limpeza/${stateLimpeza}/${id}`);
      await getLimpezas();
      setLoading(false);
    } catch (error) {
      return;
    }
  }
  React.useEffect(() => {
    if (gerenteIds.length) setGerenteList(gerenteIds);
    if (suitIds.length) setSuitList(suitIds);
    if (empregadoIds.length) setEmpregadoList(empregadoIds);
  }, [gerenteIds, suitIds, empregadoIds, setGerenteList, setSuitList, setEmpregadoList]);
  return (
    <Grid container spacing={3} sx={{ paddingX: 0 }}>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Relatório mensal</Typography>
        </Stack>
      </Grid>
      {/* <LimpezasFilters applyFilters={getLimpezas} withoutFilters={withoutFilters} /> */}
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingX: 0 }} item>
        <ControlesTable
          handleDelete={deleteLimpeza}
          //   getControle={getControle}
          count={controls.length}
          rows={controls}
          loading={loading}
          refresh={getLimpezas}
          empregados={empregados}
          suits={suits}
          gerentes={gerentes}
          getControles={getControleWithFilters}
        />
      </Grid>
    </Grid>
  );
}
