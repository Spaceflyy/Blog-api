const ReplyForm = ({ setReplyingId, handleReply }) => {
	return (
		<form onSubmit={handleReply}>
			<input type="text" id="reply" placeholder="Write a reply..." />
			<button>Reply</button>
			<button
				onClick={() => {
					setReplyingId();
				}}>
				Close
			</button>
		</form>
	);
};

export default ReplyForm;
