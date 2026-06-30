import "react"

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "typebot-standard": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          typebot?: string
          "api-host"?: string
        },
        HTMLElement
      >
    }
  }
}
