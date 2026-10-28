import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import GlassCard from "../../../components/common/GlassCard";
import Mark from "../../../components/common/Mark";
import type { MoveEntry } from "../types/game.types";

interface Props {
  history: MoveEntry[];
}

const MIN_HEIGHT = 236;
const MAX_HEIGHT = 280;
const MIN_WIDTH = 320;

export default function MoveHistory({ history }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [history.length]);

  return (
    <GlassCard
      component="section"
      aria-labelledby="history-title"
      sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography id="history-title" component="h2" sx={{ fontSize: "1.1rem", fontWeight: 700 }}>
          Move history
        </Typography>
        <Box
          sx={(theme) => ({
            minWidth: 28,
            px: 1,
            py: 0.25,
            borderRadius: 999,
            textAlign: "center",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: theme.palette.game.x,
            background: theme.palette.game.xSoft,
          })}
        >
          {history.length}
        </Box>
      </Box>

      <Box
        ref={scrollRef}
        tabIndex={0}
        aria-label="Move history table"
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          flex: { md: "1 1 0" },
          minHeight: MIN_HEIGHT,
          maxHeight: { xs: MAX_HEIGHT, md: "none" },
          overflow: "auto",
          overscrollBehavior: "contain",
          borderRadius: "16px",
          background: theme.palette.game.cell,
          border: `1px solid ${theme.palette.game.divider}`,
        })}
      >
        <Table
          size="small"
          stickyHeader
          sx={(theme) => ({
            minWidth: MIN_WIDTH,
            flexShrink: 0,
            "& .MuiTableCell-root": {
              borderColor: theme.palette.game.divider,
              color: "text.primary",
              fontFamily: "inherit",
              py: 1.4,
              px: 1.75,
            },
            "& .MuiTableHead-root .MuiTableCell-root": {
              background: theme.palette.game.tableHead,
              color: "text.secondary",
              fontSize: "0.8rem",
              fontWeight: 600,
            },
            "& .MuiTableBody-root .MuiTableCell-root": {
              fontSize: "0.88rem",
              fontWeight: 500,
            },
            "& .MuiTableBody-root .MuiTableRow-root:last-of-type .MuiTableCell-root": {
              borderBottom: 0,
            },
          })}
        >
          <TableHead>
            <TableRow>
              <TableCell>Move</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map(({ move, player, row, col }) => (
              <TableRow key={move}>
                <TableCell>{move}</TableCell>
                <TableCell>
                  <Box
                    role="img"
                    aria-label={`Player ${player}`}
                    sx={(theme) => ({
                      width: 26,
                      height: 26,
                      borderRadius: "8px",
                      display: "grid",
                      placeItems: "center",
                      background: player === "X" ? theme.palette.game.xSoft : theme.palette.game.oSoft,
                    })}
                  >
                    <Mark player={player} size={12} animate={false} />
                  </Box>
                </TableCell>
                <TableCell>
                  Row {row}, Column {col}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {history.length === 0 && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              py: 4,
              px: 2,
              textAlign: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: 0.75, opacity: 0.5 }}>
              <Mark player="X" size={28} animate={false} />
              <Mark player="O" size={28} animate={false} />
            </Box>
            <Typography sx={{ fontSize: "0.95rem", fontWeight: 600, color: "text.primary" }}>
              No moves yet
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", mt: -1, maxWidth: 240 }}>
              Tap a square to start.
            </Typography>
          </Box>
        )}
      </Box>
    </GlassCard>
  );
}
