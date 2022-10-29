import React from 'react';

const Notification = ({ notifications }) => {
  return (
    <div className="notification__container absolute top-full right-[-4rem]">
      {notifications &&
        notifications.map((noti) => {
          return (
            <>
              <div class="bg-white cursor-pointer text-black shadow rounded-lg px-2 py-1 w-80 space-y-2 hover:bg-gray-300">
                <div class="flex justify-start items-start space-x-4">
                  <div class="relative flex flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1582789991349-8f8e6eb15308?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fGFuaW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      alt="Meow"
                      class="w-14 h-14 rounded-full object-cover"
                    />
                    <div class="absolute -bottom-1 -right-2 h-7 w-7 bg-gradient-to-t from-blue-600 via-cyan-500 to-cyan-400 rounded-full text-white flex justify-center items-start">
                      <div class="">
                        <svg
                          class="w-5 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col min-h-20 ">
                    <div class="overflow-ellipsis text-sm mt-3">
                      <div class="clamp-3 ">
                        <span className="">{noti.content}</span>
                        {/* <b class="font-semibold">Hasan Muhammad</b> Menambahkann
                        2 foto di{' '}
                        <b class="font-semibold">Tailwind CSS Indonesia</b> */}
                      </div>
                    </div>
                    <div class="text-blue-600 text-left font-semibold text-xs leading-loose">
                      1 phút trước
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}

    </div>
  );
};

export default Notification;
