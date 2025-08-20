export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
});
export const usePathname = jest.fn(() => "/");
export const useSearchParams = () => new URLSearchParams();
