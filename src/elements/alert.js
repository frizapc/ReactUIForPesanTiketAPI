function CallAlert({ status, message }) {
  let getStatus = `alert alert-${status} alert-dismissible`;
  let getMessage = message;
  return (
    <>
      <div className={getStatus} role="alert">
        <div>{getMessage}</div>
      </div>
    </>
  );
}

export default CallAlert;
