"use client";

import Gallery from "./gallery";
import InfoMenu from "./info_menu";
import Modal from "./ui/menu_modal";
import usePreviewModal from "@/hooks/store/user/use_preview_modal";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const menu = usePreviewModal((state) => state.data);

  if (!menu) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={menu.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <InfoMenu data={menu} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
