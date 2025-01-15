'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CakeIcon from '../../../../public/images/icons/cake.svg';
import ArrowIcon from '../../../../public/my-log-images/arrow-forward.svg';
import LogIcon from '../Icons/LogIcon';

const CreateLog: React.FC = () => {
  const router = useRouter();

  const handleLogButtonClick = () => {
    router.push('/log-entry/new-log');
  };

  return (
    <>
      {/* 최근 방문 알림 섹션 */}
      <article className="mt-4">
        <div className="bg-gray-100 rounded-[4px] p-4 flex items-center">
          <figure className="flex-shrink-0 mr-1">
            <Image src={CakeIcon} alt="베니케이크 아이콘" />
          </figure>
          <div className="ml-4 flex flex-col justify-between w-full">
            <p className="font-bold" role="heading" aria-level={2}>
              베니케이크 연남점을 최근에 방문하셨네요!
            </p>
            <div className="flex mt-1">
              <button
                onClick={handleLogButtonClick}
                className="text-gray-700 text-sm flex items-center cursor-pointer"
                aria-label="케이크 로그 작성하기"
              >
                케이크로그 작성하기
                <span className="ml-1 flex items-center justify-center">
                  <Image src={ArrowIcon} alt="화살표 아이콘" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* 로그 작성 버튼 섹션 */}
      <section className="mt-5">
        <button
          onClick={handleLogButtonClick}
          className="w-full h-[38px] text-[14px] border border-grayscale500 rounded-[4px] flex items-center justify-center gap-2"
          aria-label="로그 작성하기"
        >
          <LogIcon width={24} height={24} />
          로그 작성하기
        </button>
      </section>
    </>
  );
};

export default CreateLog;
