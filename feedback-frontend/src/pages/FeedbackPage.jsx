import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  user: yup.string().required("Name is required"),
  message: yup.string().required("Feedback is required"),
});

function FeedbackPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5001/api/feedback", data);
      alert("Feedback submitted successfully!");
    } catch (error) {
      alert("Failed to submit feedback");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-grey-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Provide Feedback</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            {...register("user")}
            className="w-full p-2 border rounded"
          />
          {errors.user && <p className="text-red-500 text-sm">{errors.user.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Feedback</label>
          <textarea
            {...register("message")}
            className="w-full p-2 border rounded"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FeedbackPage;