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
          <img src="/public/icons/play.svg" />
        ) : (
          <img src="/public/icons/stop.svg" />
        )}
      </button>
      <button onClick={handleSettingsClick}>
        <img src="/public/icons/settings.svg" />
      </button>
      <button onClick={handleResetClick}>
        <img src="/public/icons/restart.svg" />
      </button>
    </div>
  );
};
