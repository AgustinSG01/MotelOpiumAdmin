/* eslint-disable @typescript-eslint/no-unsafe-call -- comentario*/ 
/* eslint-disable @typescript-eslint/no-explicit-any -- comentario*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- comentario*/
/* eslint-disable no-console -- comentario*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- comentario*/
'use client';

import * as React from 'react';

//importar css

import "../../../../styles/print-relatorio.css";

import { type ControleData } from '@/types/types';

interface PrintData {
  controls: ControleData[];
  totalLimpezas: number;
  gerenteName: string;
  mediaGerente: string;
  date: string;
  shift: string;
}

export default function PrintPage(): React.JSX.Element {
  const [data, setData] = React.useState<PrintData | null>(null);

  React.useEffect(() => {
    const rawData = sessionStorage.getItem('relatorio-print-data');
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData) as PrintData;
        setData(parsed);

        //timeout e imprimir
        setTimeout(() => { window.print(); }, 800);
      } catch (error) {
        console.error('Erro ao processar dados', error);
      }
    }
  }, []);

  if (!data) return <p>Carregando...</p>;

  const lowScores = (data as any).lowScores || [];
  console.log("lowScores", lowScores);

  return (
    <div className="print-container">
      <div className="print-header">
        <h1>OPIUM MOTEL</h1>
        <h2>Relatório de Início de Plantão</h2>
        <div className="print-identification">
          <div>
            <strong>Gerente:</strong> {data.gerenteName}
          </div>
          <div>
            <strong>Data:</strong> {data.date}
          </div>
          <div>
            <strong>Plantão:</strong> {data.shift}
          </div>
        </div>
      </div>

      <div className="print-block">
        <h2>Resumo Operacional</h2>
        <table className="print-table">
          <thead>
            <tr>
              <th>Limpezas Totais</th>
              <th>Média Gerente</th>
              <th>Controles Recebidos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.totalLimpezas}</td>
              <td>{data.mediaGerente}</td>
              <td>{data.controls.length}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECÇÃO DE PONTUAÇÕES BAIXAS */}
      <div className="print-block">
        <h2>Pontuações Baixas</h2>
        <table className="print-table">
          <thead>
            <tr>
              <th>Suíte</th>
              <th>Funcionário</th>
              <th>Pontuação</th>
              <th>Comentário</th>
            </tr>
          </thead>
          <tbody>
            {lowScores.length > 0 ? (
              lowScores.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.suit || item.controle?.suit}</td>
                  <td>{item.empregado || item.controle?.empregado}</td>
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{item.score || item.pontuacao}</td>
                  <td>{item.comment || item.comentario || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Nenhuma pontuação baixa registrada.</td>
              </tr>
            )}
          </tbody>
        </table>
        {lowScores.length > 5 && (
          <p className="warning-text">Existem mais {lowScores.length - 5} itens com pontoação baixa.</p>
        )}
      </div>

      <div className="print-block">
        <h2>Tabela de Controles</h2>
        <table className="print-table">
          <thead>
            <tr>
              <th>Suíte</th>
              <th>Média</th>
              <th>Horário</th>
              <th>Funcionário</th>
            </tr>
          </thead>
          <tbody>
            {data.controls.map((item) => (
              <tr key={item.id}>
                <td>{item.suit}</td>
                <td>{item.mg}</td>
                <td>{item.data ? new Date(item.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                <td>{item.empregado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="print-block manual-notes">
        <h2>Feedback</h2>
        <div
          className="manual-area"
          style={{ height: '80px', border: '1px solid #ccc', marginBottom: '10px', padding: '5px' }}
        >
          <strong>Conversa de Plantão:</strong>
        </div>
        <div
          className="manual-area"
          style={{ height: '80px', border: '1px solid #ccc', marginBottom: '30px', padding: '5px' }}
        >
          <strong>Ações Definidas:</strong>
        </div>

        <div className="signature-section" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ borderTop: '1px solid black', width: '200px', textAlign: 'center', fontSize: '12px' }}>
            Assinatura Gerente
          </div>
          <div style={{ borderTop: '1px solid black', width: '200px', textAlign: 'center', fontSize: '12px' }}>
            Visto Equipe
          </div>
        </div>
      </div>
    </div>
  );
}
