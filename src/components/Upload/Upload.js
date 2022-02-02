export const Upload = () => {
  return (
    <div>
      <form
        action="http://localhost:4000/upload-avatar"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" id="avatar" name="avatar" />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};
