import MarkIcon from '../Icons/MarkIcon';

interface EmptyStateProps {
  item: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ item }) => (
  <div className="flex flex-col gap-2 items-center justify-center mt-60">
    <MarkIcon className="p-2" width={54} height={54} />
    <p className="text-center font-bold text-[18px] text-grayscale700">
      저장한 {item} 없음
    </p>
    <p className="text-center text-sm text-grayscale400">
      CakeWay에서 케이크와 로그를
      <br />
      저장하고 컬렉션을 구성해보세요!
    </p>
  </div>
);

export default EmptyState;
