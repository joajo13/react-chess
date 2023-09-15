export const Settings = ({
  handlePlayClick,
  handleSettingsClick,
  handleResetClick,
  counters,
}) => {
  return (
    <div className="options-container">
      <button onClick={handlePlayClick}>
        {counters.onPause ? (
          <img src="src/assets/play.svg" />
        ) : (
          <img src="src/assets/stop.svg" />
        )}
      </button>
      <button onClick={handleSettingsClick}>
        <img src="src/assets/settings.svg" />
      </button>
      <button onClick={handleResetClick}>
        <img src="src/assets/restart.svg" />
      </button>
    </div>
  );
};
