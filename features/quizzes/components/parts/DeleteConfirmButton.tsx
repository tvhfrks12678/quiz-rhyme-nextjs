import React from 'react';

const MESSAGE_DEDETE_CONFIRM = '投稿したクイズを削除しますか?';

export const DeleteConfirmButton = ({
  onDeleteClicked,
}: {
  onDeleteClicked: React.MouseEventHandler<HTMLLabelElement>;
}) => {
  return (
    <>
      <label htmlFor="my-modal" className="btn btn-secondary">
        削除
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{MESSAGE_DEDETE_CONFIRM}</h3>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn btn-ghost">
              キャンセル
            </label>
            <label
              htmlFor="my-modal"
              onClick={onDeleteClicked}
              className="btn btn-secondary">
              削除
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
