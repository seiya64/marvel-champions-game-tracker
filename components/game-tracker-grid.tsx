"use client";

import { GameTrackerEntry } from "@/types/game-tracker-entry";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { FC, ReactElement, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { TABLE_DATE_FORMAT } from "@/constants/constants";
import { useGameTrackerStore } from "@/providers/game-tracker-store-provider";

ModuleRegistry.registerModules([AllCommunityModule]);

const GameTrackerGrid: FC<any> = (): ReactElement => {
  const rowData = useGameTrackerStore((state) => state.gameTrackerEntries);
  const loadGameTrackerEntries = useGameTrackerStore(
    (state) => state.loadGameTrackerEntries
  );
  const gameTrackerFirstLoad = useGameTrackerStore(
    (state) => state.gameTrackerFirstLoad
  );
  const setGameTrackerFirstLoad = useGameTrackerStore(
    (state) => state.setGameTrackerFirstLoad
  );

  useEffect(() => {
    if (gameTrackerFirstLoad) {
      loadGameTrackerEntries();
      setGameTrackerFirstLoad(false);
    }
  }, [rowData]);

  const columnDefs: ColDef[] = [
    {
      field: "hero",
      headerName: "Hero",
    },
    {
      field: "villain",
      headerName: "Villain",
    },
    {
      field: "gameResult",
      headerName: "Result",
      cellStyle: () => ({
        textTransform: "capitalize",
      }),
    },
    {
      field: "date",
      headerName: "Date",
      valueGetter: (grid) =>
        new Date(Date.parse(grid.data.date)).toLocaleDateString("es-ES"),
    },
    {
      field: "time",
      headerName: "Time",
      valueGetter: (grid) =>
        new Date(Date.parse(grid.data.date)).toLocaleTimeString("es-ES"),
    },
  ];

  const defaultColDef = {
    resizable: false,
  };

  return (
    <div className="flex flex-column h-dvh">
      <div style={{ width: "100%", height: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoSizeStrategy={{ type: "fitGridWidth" }}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default GameTrackerGrid;

