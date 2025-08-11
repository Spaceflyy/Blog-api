import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

const PostEditor = () => {
	const [content, setContent] = useState("");
	const handleEditorChange = (newContent) => {
		setContent(newContent);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(content);
		//send the content of the tinymce to the database
		//need to figure out how to render from the content received from the database
	};

	return (
		<form onSubmit={handleSubmit}>
			<Editor
				apiKey={import.meta.env.VITE_TINYAPI}
				value={content}
				onEditorChange={handleEditorChange}
				init={{
					plugins: [
						// Core editing features
						"anchor",
						"autolink",
						"charmap",
						"codesample",
						"emoticons",
						"image",
						"link",
						"lists",
						"media",
						"searchreplace",
						"table",
						"visualblocks",
						"wordcount",
						// Your account includes a free trial of TinyMCE premium features
						// Try the most popular premium features until Aug 16, 2025:
						// "checklist",
						// "mediaembed",
						// "casechange",
						// "formatpainter",
						// "pageembed",
						// "a11ychecker",
						// "tinymcespellchecker",
						// "permanentpen",
						// "powerpaste",
						// "advtable",
						// "advcode",
						// "editimage",
						// "advtemplate",
						// "ai",
						// "mentions",
						// "tinycomments",
						// "tableofcontents",
						// "footnotes",
						// "mergetags",
						// "autocorrect",
						// "typography",
						// "inlinecss",
						// "markdown",
						// "importword",
						// "exportword",
						// "exportpdf",
					],
					toolbar:
						"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
					tinycomments_mode: "embedded",
					tinycomments_author: "Author name",
					mergetags_list: [
						{ value: "First.Name", title: "First Name" },
						{ value: "Email", title: "Email" },
					],
				}}
			/>
			<button type="submit">Save Draft</button>
			<button> Publish Post</button>
		</form>
	);
};

export default PostEditor;
