export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			aw_time: {
				Row: {
					created_at: string;
					end_time: string;
					id: number;
					location_id: number;
					same_times_all_week: boolean | null;
					start_time: string;
					weekday: number;
				};
				Insert: {
					created_at?: string;
					end_time: string;
					id?: number;
					location_id: number;
					same_times_all_week?: boolean | null;
					start_time: string;
					weekday: number;
				};
				Update: {
					created_at?: string;
					end_time?: string;
					id?: number;
					location_id?: number;
					same_times_all_week?: boolean | null;
					start_time?: string;
					weekday?: number;
				};
				Relationships: [
					{
						foreignKeyName: "aw_time_location_id_fkey";
						columns: ["location_id"];
						isOneToOne: false;
						referencedRelation: "location";
						referencedColumns: ["id"];
					},
				];
			};
			location: {
				Row: {
					afternoon_sun: boolean | null;
					beer_brand: string | null;
					centiliters_pitcher: number | null;
					centiliters_standard: number;
					created_at: string;
					id: number;
					latitude: number;
					longitude: number;
					name: string;
					outdoor_seating: boolean | null;
					price_aw: number | null;
					price_pitcher: number | null;
					price_standard: number;
					url_maps: string | null;
					url_website: string | null;
				};
				Insert: {
					afternoon_sun?: boolean | null;
					beer_brand?: string | null;
					centiliters_pitcher?: number | null;
					centiliters_standard: number;
					created_at?: string;
					id?: number;
					latitude: number;
					longitude: number;
					name: string;
					outdoor_seating?: boolean | null;
					price_aw?: number | null;
					price_pitcher?: number | null;
					price_standard: number;
					url_maps?: string | null;
					url_website?: string | null;
				};
				Update: {
					afternoon_sun?: boolean | null;
					beer_brand?: string | null;
					centiliters_pitcher?: number | null;
					centiliters_standard?: number;
					created_at?: string;
					id?: number;
					latitude?: number;
					longitude?: number;
					name?: string;
					outdoor_seating?: boolean | null;
					price_aw?: number | null;
					price_pitcher?: number | null;
					price_standard?: number;
					url_maps?: string | null;
					url_website?: string | null;
				};
				Relationships: [];
			};
		};
		Views: Record<never, never>;
		Functions: Record<never, never>;
		Enums: Record<never, never>;
		CompositeTypes: Record<never, never>;
	};
}

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
