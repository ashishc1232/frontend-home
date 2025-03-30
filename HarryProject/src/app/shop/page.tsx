import Shop from "../components/After_log_homepage/Shop";
import ProtectedRoute from "../components/ProtectedRoutes";
export default function Page() {
  return (
    <div>

      <ProtectedRoute>
        <Shop />
      </ProtectedRoute>

    </div>
  );
}  