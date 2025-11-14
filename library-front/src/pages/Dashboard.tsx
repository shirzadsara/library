import { useGetProfileQuery } from '../features/apiSlice';
import { NavbarDashboard } from '../component/NavbarDashboard';
import {BooksList} from '../component/BooksList';
import {HeroSlider}from '../component/HeroSlider';

export const Dashboard = () => {

  const { data: user, isLoading } = useGetProfileQuery();
  if (isLoading) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      <NavbarDashboard userEmail={user?.email} />
      <HeroSlider/>
      <BooksList/>
    </div>
  );
};