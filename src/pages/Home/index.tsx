import { Box, Button } from "@mui/material";
import GlassCard from "../../components/common/GlassCard";
import Header from "../../features/game/components/Header";
import Board from "../../features/game/components/Board";
import StatusChip from "../../features/game/components/StatusChip";
import Scoreboard from "../../features/game/components/Scoreboard";
import MoveHistory from "../../features/game/components/MoveHistory";
import GameToast from "../../features/game/components/GameToast";
import { useTicTacToe } from "../../features/game/hooks/useTicTacToe";
import { getStatus } from "../../utils/helpers";

function Home() {
  const game = useTicTacToe();
  const { result, currentPlayer, mode, isComputerTurn } = game;

  const status = getStatus(result, currentPlayer, mode);

  return (
    <>
      <title>Tic-Tac-Toe | A classic game of Xs and Os</title>
      <Header mode={mode} onModeChange={game.changeMode} />
      <GameToast toast={game.toast} mode={mode} onClose={game.closeToast} />

      <Box
        component="main"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.5fr) minmax(0, 1fr)" },
          gap: 3,
          alignItems: { xs: "start", md: "stretch" },
        }}
      >
        <GlassCard
          component="section"
          aria-label="Game board"
          sx={{ display: "flex", flexDirection: "column", gap: 3, minHeight: { md: 660 } }}
        >
          <Box>
            <StatusChip label={status.label} tone={status.tone} />
          </Box>

          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <Board
              board={game.board}
              winningLine={result?.line ?? []}
              disabled={result !== null || isComputerTurn}
              onCellClick={game.play}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5 }}>
            <Button variant="contained" onClick={game.newGame}>
              New game
            </Button>
            <Button variant="outlined" onClick={game.undo} disabled={!game.canUndo}>
              Undo move
            </Button>
          </Box>
        </GlassCard>

        <Box
          component="aside"
          aria-label="Game stats"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Scoreboard scores={game.scores} mode={mode} onReset={game.resetScores} />
          <MoveHistory history={game.history} />
        </Box>
      </Box>
    </>
  );
}

export default Home;
