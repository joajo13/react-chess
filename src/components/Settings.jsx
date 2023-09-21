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
          <img src="/icons/play.svg" />
        ) : (
          <img src="/icons/stop.svg" />
        )}
      </button>
      <button onClick={handleSettingsClick}>
        <img src="/icons/settings.svg" />
      </button>
      <button onClick={handleResetClick}>
        <img src="/icons/restart.svg" />
      </button>
    </div>
  );
};
