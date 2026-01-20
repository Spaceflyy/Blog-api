const ReplyForm = ({ setReplyingId }) => (
	<>
		<input type="text" id="reply" placeholder="Write a reply..." />
		<button>Reply</button>
		<button
			onClick={() => {
				setReplyingId();
			}}>
			Close
		</button>
	</>
);

export default ReplyForm;
