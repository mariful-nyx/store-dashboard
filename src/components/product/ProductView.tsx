import { QRCodeSVG } from "qrcode.react";
import Drawer from "../Drawer";
import { useApi } from "../../api/api";
import { useEffect, useState } from "react";
import { LuPrinter } from "react-icons/lu";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { IoArrowDown } from "react-icons/io5";
import Button from "../Button";
import VariantForm from "./VariantForm";
import { MdDelete } from "react-icons/md";
import { useToast } from "../../contexts/Notification";
import { CiEdit } from "react-icons/ci";
import VariantEdit from "./VariantEdit";
import { Tooltip } from "react-tooltip";
import ProductEdit from "./ProductEdit";

interface ProductViewProps {
  isOpen: boolean;
  onClose: VoidFunction;
  slug: string;
  refresh: VoidFunction;
}

function ProductView({ isOpen, onClose, slug, refresh }: ProductViewProps) {
  const api = useApi();
  const [product, setProduct] = useState<any>();
  const [variantForm, setVariantForm] = useState<boolean>(false);
  const { addToast } = useToast();
  const [variantEdit, setVariantEdit] = useState(null);
  const [productEdit, setProductEdit] = useState<any>(null);

  const fetchProductDetail = () => {
    api
      .getProductDetail(slug)
      .then((response) => {
        setProduct(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    if (slug) {
      fetchProductDetail();
    }
  }, [slug]);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleDownload = (id: number) => {
    const qrCodeRef = document.getElementById(`qrcode-${id}`);

    if (qrCodeRef) {
      const svgData = new XMLSerializer().serializeToString(qrCodeRef);
      const dataUrl = "data:image/svg+xml;base64," + window.btoa(svgData);

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${id}-qrcode.svg`; // Use variant ID to make the file name unique
      a.click();
    }
  };

  if (!product) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} title="Order Details">
        <div className="bg-white dark:bg-gray-800 h-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      </Drawer>
    );
  }

  const handleDeleteVariant = (id: number) => {
    api
      .deleteVariant(id)
      .then(() => {
        addToast("Variant successfully deleted !", "success");
        fetchProductDetail();
      })
      .catch(() => addToast("Variant failed to delete !", "error"));
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Product">
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between items-start  border border-slate-300 dark:border-slate-600 rounded-md p-4 text-slate-800 dark:text-slate-50">
          <div>
            <div>
              <strong>Product Name: </strong>
              {product?.name}
            </div>
            <div>
              <strong>Product Description: </strong>
              {product?.description}
            </div>

            <div className="mt-4 bg-blue-50 dark:bg-blue-500 text-blue-500 dark:text-blue-50 font-medium rounded-md w-fit px-4 py-1">
              {product?.category}
            </div>
          </div>
          <button
            className=" hover:text-blue-500"
            onClick={() => setProductEdit("ygyug")}
            data-tooltip-id={`product_edit`}
            data-tooltip-content={"Product Edit"}
          >
            <CiEdit className="w-5 h-5" />
          </button>
          <Tooltip
            id={`product_edit`}
            place="left"
            style={{ fontSize: 12, fontWeight: "bold" }}
          />
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-slate-800 dark:text-slate-50 font-bold">
            Variants
          </h1>
          <Button onClick={() => setVariantForm(true)} btntype="Outline">
            + Add variant
          </Button>
        </div>
        <div className="border border-slate-300 dark:border-slate-600 rounded-md p-4 text-slate-800 dark:text-slate-50 flex flex-col gap-8">
          
          {product?.variants.map((variant: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div>
                <div>
                  <div>
                    <strong>Variant Name: </strong>
                    {variant.name}
                  </div>
                  <div>
                    <strong>Variant price: </strong>
                    {variant.price}
                  </div>
                  <div>
                    <strong>Variant sku: </strong>
                    {variant.sku}{" "}
                  </div>
                  <div>
                    <strong>Variant stock: </strong>
                    {variant.stock}
                  </div>

                  {Object.entries(variant.attribute).map(
                    ([key, value], index: number) => (
                      <div key={index}>
                        <strong>{key}: </strong> {value as string}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-0 justify-center">
                <div
                  className="bg-white p-4 w-fit print-only"
                  id={`qrcode-${variant.id}`}
                  ref={contentRef}
                >
                  <QRCodeSVG
                    value={JSON.stringify({
                      id: variant.id,
                      name: variant.name,
                      product: variant.product,
                      unit_price: variant.price,
                      sku: variant.sku,
                      stock: variant.stock,
                    })}
                    bgColor="white"
                    fgColor="black"
                  />
                </div>
                <div
                  onClick={() => handleDownload(variant.id)}
                  className="flex gap-1 justify-center  cursor-pointer hover:text-blue-500 items-center"
                >
                  <IoArrowDown className=" " />
                  <div>svg</div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <MdDelete
                  className="text-red-500 h-6 w-6"
                  onClick={() => handleDeleteVariant(variant?.id)}
                />
                <CiEdit
                  className="text-blue-500 h-6 w-6"
                  onClick={() => setVariantEdit(variant)}
                />
                <LuPrinter
                  className="hover:text-blue-500 duration-200 h-6 w-6"
                  onClick={() => reactToPrintFn()}
                />
              </div>
            </div>
          ))}
        </div>

        {variantForm && (
          <VariantForm
            isOpen={variantForm}
            onClose={() => setVariantForm(false)}
            productId={product?.id}
            refresh={fetchProductDetail}
          />
        )}

        {variantEdit && (
          <VariantEdit
            isOpen={variantEdit ? true : false}
            onClose={() => setVariantEdit(null)}
            variant={variantEdit}
            refresh={fetchProductDetail}
          />
        )}

        {productEdit && (
          <ProductEdit
            isOpen={productEdit ? true : false}
            onClose={() => setProductEdit(null)}
            product={product}
            refresh={() => {
              refresh();
              fetchProductDetail();
            }}
          />
        )}
      </div>
    </Drawer>
  );
}

export default ProductView;
